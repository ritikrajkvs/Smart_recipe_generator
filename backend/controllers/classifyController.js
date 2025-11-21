const axios = require("axios");

exports.classifyImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        error: "Image is required",
      });
    }

    const API_KEY = process.env.GOOGLE_VISION_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        success: false,
        error: "Google Vision API key missing",
      });
    }

    const base64 = image.replace(/^data:image\/\w+;base64,/, "");

    const requestBody = {
      requests: [
        {
          image: { content: base64 },
          features: [
            { type: "LABEL_DETECTION", maxResults: 20 },
            { type: "OBJECT_LOCALIZATION", maxResults: 10 }
          ],
        },
      ],
    };

    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
      requestBody
    );

    const data = response.data.responses[0] || {};

    const labels = data.labelAnnotations || [];
    const objects = data.localizedObjectAnnotations || [];

    // --- EXPANDED IGNORE LIST (Garbage Collection) ---
    const IGNORED_TERMS = new Set([
      // Generic Food Terms
      "food", "recipe", "cooking", "dish", "cuisine", "ingredient", "ingredients",
      "meal", "lunch", "dinner", "breakfast", "snack", "brunch", "supper",
      "staple food", "finger food", "fast food", "junk food", "comfort food",
      "delicacy", "garnish", "condiment", "side dish", "appetizer", "dessert",
      "vegetarian food", "vegan nutrition", "food group", "diet food", "nutrition",
      "superfood", "natural foods", "whole food", "local food", "processed food",
      "convenience food", "american food", "indian cuisine", "chinese food",
      "italian food", "mexican food", "asian food", "european food", "african food",
      "soul food", "street food", "take-out food", "leftovers", "frozen food",
      
      // Generic Categories (Too broad for recipes)
      "produce", "fruit", "vegetable", "leaf vegetable", "root vegetable", 
      "cruciferous vegetables", "nightshade family", "legume", "legumes", "pulse",
      "grain", "cereal", "dairy", "dairy product", "meat", "poultry", "seafood",
      "fish", "shellfish", "plant", "crop", "harvest", "agriculture", "seed", "nut",
      "herb", "spice", "bush tomato", "plum tomato", "cherry tomato", "garden salad",
      
      // Non-Food Objects & Tableware
      "tableware", "dishware", "plate", "bowl", "spoon", "fork", "knife", "cutlery",
      "serveware", "porcelain", "ceramic", "glass", "cup", "mug", "platter", "tray",
      "kitchen utensil", "kitchenware", "cookware and bakeware", "table", "wood", 
      "hardwood", "tablecloth", "linen", "napkin", "basket", "wicker", "container",
      "bottle", "jar", "can", "tin", "box", "bag", "plastic", "paper", "cardboard",
      "liquid", "fluid", "drink", "beverage"
    ]);

    // Combine labels and objects
    let rawResults = [
      ...labels.map((l) => ({ name: l.description.toLowerCase(), confidence: l.score })),
      ...objects.map((o) => ({ name: o.name.toLowerCase(), confidence: o.score }))
    ];

    // Filter out duplicates and ignored terms
    const uniqueIngredients = new Map();
    
    rawResults.forEach(item => {
      const name = item.name.trim();
      
      // 1. Basic Filter: Check ignore list and short words
      if (IGNORED_TERMS.has(name) || name.length <= 2) return;

      // 2. Keyword Filter: Remove phrases containing generic words
      // e.g. "fried food", "vegetable dish"
      if (name.includes("food") && !name.includes("seafood")) return; 
      if (name.includes("dish") && name !== "radish") return;
      if (name.includes("recipe")) return;
      if (name.includes("cuisine")) return;
      if (name.includes("ingredient")) return;
      if (name.includes("nutrition")) return;

      // 3. Priority Logic: If duplicate, keep the one with higher confidence
      if (!uniqueIngredients.has(name) || uniqueIngredients.get(name).confidence < item.confidence) {
        uniqueIngredients.set(name, item);
      }
    });

    const results = Array.from(uniqueIngredients.values());

    return res.json({
      success: true,
      ingredients: results,
    });

  } catch (error) {
    console.error("VISION ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: "AI classification failed",
      details: error.message,
    });
  }
};
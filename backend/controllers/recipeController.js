const fs = require('fs');
const path = require('path');
const matchRecipes = require('../utils/matchRecipes');
let RecipeModel;
try { RecipeModel = require('../models/Recipe'); } catch (e) { RecipeModel = null; }

const recipesJsonPath = path.join(__dirname, '../data/recipes.json');

async function loadAllRecipes() {
  if (RecipeModel && RecipeModel.find) {
    // fetch from MongoDB
    const docs = await RecipeModel.find().lean();
    return docs;
  } else {
    // fallback to JSON file
    const raw = fs.readFileSync(recipesJsonPath, 'utf8');
    return JSON.parse(raw);
  }
}

exports.getMatchedRecipes = async (req, res) => {
  try {
    const { ingredients, diet, difficulty, maxTime } = req.query;
    const allRecipes = await loadAllRecipes();
    let results = [];

    if (ingredients) {
      // Normal Search Mode: Match ingredients
      const ingredientList = ingredients.split(',').map(i => i.trim().toLowerCase()).filter(Boolean);
      const filters = { diet: diet || null, difficulty: difficulty || null, maxTime: maxTime ? Number(maxTime) : null };
      results = matchRecipes(allRecipes, ingredientList, filters);
    } else {
      // Recommendation Mode: Return all (filtered by params only)
      let candidates = allRecipes;
      
      // Apply basic filters if they exist
      if (diet) candidates = candidates.filter(r => r.diet && r.diet.map(d=>d.toLowerCase()).includes(diet.toLowerCase()));
      if (difficulty) candidates = candidates.filter(r => r.difficulty === difficulty);
      if (maxTime) candidates = candidates.filter(r => r.cookTimeMin <= Number(maxTime));

      // Wrap in the expected structure
      results = candidates.map(r => ({
        recipe: r,
        score: r.popularity || 0,
        matchedIngredients: [],
        missingIngredients: []
      }));

      // Sort by popularity (highest first)
      results.sort((a, b) => b.score - a.score);
    }

    return res.json({ success: true, count: results.length, results });
  } catch (err) {
    console.error('getMatchedRecipes error', err);
    return res.status(500).json({ success: false, error: 'matching failed' });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const id = req.params.id;
    if (RecipeModel && RecipeModel.findOne) {
      const recipe = await RecipeModel.findOne({ id }).lean();
      if (!recipe) return res.status(404).json({ success: false, error: 'not found' });
      return res.json({ success: true, recipe });
    } else {
      const all = JSON.parse(fs.readFileSync(recipesJsonPath, 'utf8'));
      const recipe = all.find(r => r.id === id);
      if (!recipe) return res.status(404).json({ success: false, error: 'not found' });
      return res.json({ success: true, recipe });
    }
  } catch (err) {
    console.error('getRecipeById error', err);
    return res.status(500).json({ success: false, error: 'fetch failed' });
  }
};

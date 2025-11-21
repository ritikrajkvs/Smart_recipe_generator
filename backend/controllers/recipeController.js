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
    if (!ingredients) return res.status(400).json({ success: false, error: 'ingredients query required' });

    const ingredientList = ingredients.split(',').map(i => i.trim().toLowerCase()).filter(Boolean);
    const allRecipes = await loadAllRecipes();
    const filters = { diet: diet || null, difficulty: difficulty || null, maxTime: maxTime ? Number(maxTime) : null };
    const results = matchRecipes(allRecipes, ingredientList, filters);
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

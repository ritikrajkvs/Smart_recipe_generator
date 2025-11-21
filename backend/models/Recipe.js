const mongoose = require('mongoose');
const IngredientSchema = new mongoose.Schema({ name: String, qty: Number, unit: String });
const RecipeSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: String,
  description: String,
  keywords: [String],
  ingredients: [IngredientSchema],
  steps: [String],
  difficulty: String,
  cuisine: String,
  diet: [String],
  cookTimeMin: Number,
  nutrition: {
    calories: Number,
    protein_g: Number,
    fat_g: Number,
    carbs_g: Number
  },
  popularity: Number
}, { timestamps: true });
module.exports = mongoose.model('Recipe', RecipeSchema);

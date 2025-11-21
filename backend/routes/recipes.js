const express = require('express');
const router = express.Router();
const { getMatchedRecipes, getRecipeById } = require('../controllers/recipeController');
router.get('/', getMatchedRecipes);
router.get('/:id', getRecipeById);
module.exports = router;

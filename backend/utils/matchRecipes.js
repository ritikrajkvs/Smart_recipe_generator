// backend/utils/matchRecipes.js
const substitutions = require('./substitutions');

function normalize(s) {
  return String(s || '').toLowerCase().replace(/_/g, ' ').trim();
}

function ingredientMatches(recipeIng, queryIng) {
  const r = normalize(recipeIng);
  const q = normalize(queryIng);
  if (!r || !q) return false;
  if (r === q) return true;
  if (substitutions[q] && substitutions[q].some(x => x === r || normalize(x) === r)) return true;
  if (substitutions[r] && substitutions[r].some(x => x === q || normalize(x) === q)) return true;
  if (r.endsWith('s') && r.slice(0, -1) === q) return true;
  if (q.endsWith('s') && q.slice(0, -1) === r) return true;
  // partial token match — boost but not strict
  const rTokens = r.split(/\s+/);
  const qTokens = q.split(/\s+/);
  if (rTokens.some(t => qTokens.includes(t)) || qTokens.some(t => rTokens.includes(t))) return true;
  return false;
}

module.exports = function matchRecipes(recipes, ingredients, filters = {}) {
  // recipes: array of recipe objects from DB or JSON
  const results = recipes.map(recipe => {
    const recIngs = (recipe.ingredients || []).map(i => normalize(i.name || i));
    const matched = [];
    const missing = [];
    ingredients.forEach(q => {
      const found = recIngs.find(r => ingredientMatches(r, q));
      if (found) matched.push(found);
      else missing.push(q);
    });

    const baseScore = Math.round((matched.length / Math.max(recIngs.length, 1)) * 100);
    // popularity boost scaled 0..10 -> +0..10
    const popBoost = Math.round((recipe.popularity || 4) * 2);
    // penalize missing ingredients moderately
    const penalty = missing.length * 5;
    const score = Math.max(0, Math.min(100, baseScore * 0.9 + popBoost - penalty));

    return {
      recipe,
      score,
      matchedIngredients: Array.from(new Set(matched)),
      missingIngredients: Array.from(new Set(missing))
    };
  });

  let filtered = results.filter(r => {
    if (filters.diet && (!r.recipe.diet || !r.recipe.diet.includes(filters.diet))) return false;
    if (filters.difficulty && r.recipe.difficulty && r.recipe.difficulty !== filters.difficulty) return false;
    if (filters.maxTime && r.recipe.cookTimeMin && r.recipe.cookTimeMin > filters.maxTime) return false;
    return true;
  });

  filtered.sort((a, b) => b.score - a.score);
  return filtered;
};

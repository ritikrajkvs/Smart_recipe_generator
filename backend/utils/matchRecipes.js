const substitutions = require('./substitutions');

// --- CONFIGURATION ---

// 1. Staples: Common ingredients that should have LOW influence on the score.
const STAPLES = [
  'rice', 'water', 'salt', 'sugar', 'oil', 'butter', 'ghee', 'flour', 'maida', 
  'wheat', 'bread', 'milk', 'curd', 'yogurt', 'cream', 'onion', 'tomato', 
  'potato', 'garlic', 'ginger', 'ice', 'chilli', 'pepper', 'spices', 'turmeric',
  'coriander', 'cumin', 'mustard', 'leaves', 'curry leaves', 'lemon', 'lime',
  'boil', 'hot water', 'cook', 'curry', 'gravy', 'masala', 'sauce'
];

// 2. Non-Veg Triggers
const NON_VEG_KEYWORDS = [
  'chicken', 'mutton', 'fish', 'egg', 'eggs', 'prawn', 'shrimp', 'crab', 
  'meat', 'beef', 'pork', 'bacon', 'ham', 'sausage', 'salami', 'seafood', 
  'biryani', 'rogan josh', 'kebab', 'non-veg'
];

// --- HELPER FUNCTIONS ---

function normalize(s) {
  return String(s || '').toLowerCase().replace(/_/g, ' ').trim();
}

function ingredientMatches(recipeIng, queryIng) {
  const r = normalize(recipeIng);
  const q = normalize(queryIng);
  
  if (!r || !q) return false;
  if (r === q) return true;
  if (r.includes(q) || q.includes(r)) return true;

  if (substitutions[q] && substitutions[q].some(x => normalize(x) === r)) return true;
  if (substitutions[r] && substitutions[r].some(x => normalize(x) === q)) return true;

  if (r.endsWith('s') && r.slice(0, -1) === q) return true;
  if (q.endsWith('s') && q.slice(0, -1) === r) return true;

  return false;
}

// --- MAIN LOGIC ---

module.exports = function matchRecipes(recipes, ingredients, filters = {}) {
  
  // STEP 1: DIET DETECTION
  const isNonVegInput = ingredients.some(ing => 
    NON_VEG_KEYWORDS.some(kw => ing.includes(kw))
  );

  let candidateRecipes = recipes;

  // LOGIC FIX: Only strictly hide recipes if input is PURE VEG.
  // If input has meat, we allow veg recipes too (e.g., Rice, Bread) but prioritize Meat recipes.
  if (!isNonVegInput) {
    // Strict Filter: Vegetarian User -> Hide Non-Veg
    candidateRecipes = recipes.filter(r => {
        const diet = (r.diet || []).map(d => normalize(d));
        return !diet.includes('non-vegetarian') && !diet.includes('non-veg');
    });
  } 
  // Else: Allow everything, sort later.

  // STEP 2: ACCURACY SCORING
  const results = candidateRecipes.map(recipe => {
    const recIngs = (recipe.ingredients || []).map(i => normalize(i.name || i));
    const matched = [];
    const missing = [];

    ingredients.forEach(q => {
      const found = recIngs.find(r => ingredientMatches(r, q));
      if (found) matched.push(found);
      else missing.push(q);
    });

    // -- SCORE CALCULATION --
    let matchPoints = 0;
    
    matched.forEach(ing => {
        const isStaple = STAPLES.some(s => ing.includes(s));
        if (isStaple) {
            matchPoints += 5;  // Low weight for staples
        } else {
            matchPoints += 50; // High weight for unique items
        }
    });

    // Coverage Bonus
    const coveragePercent = (matched.length / Math.max(1, recIngs.length));
    const coverageBonus = coveragePercent * 30;

    // Title Boost
    const titleNormalized = normalize(recipe.title);
    let titleBoost = 0;
    ingredients.forEach(ing => {
        if (titleNormalized.includes(ing)) {
             const isStaple = STAPLES.some(s => ing.includes(s));
             titleBoost += isStaple ? 10 : 100; // Massive boost if key ingredient is in title
        }
    });

    // Diet Priority Boost (Soft Filter)
    let dietBoost = 0;
    if (isNonVegInput) {
        const isNonVegRecipe = (recipe.diet || []).some(d => ['non-vegetarian', 'non-veg'].includes(normalize(d)));
        if (isNonVegRecipe) dietBoost = 50; // Push meat recipes up, but don't hide veg
    }

    // Penalties (Reduced to avoid hiding partial matches)
    const penalty = missing.length * 1; 

    const rawScore = matchPoints + coverageBonus + titleBoost + dietBoost - penalty;
    const finalScore = Math.max(0, Math.round(rawScore + (recipe.popularity || 0)));

    return {
      recipe,
      score: finalScore, 
      matchedIngredients: Array.from(new Set(matched)),
      missingIngredients: Array.from(new Set(missing))
    };
  });

  // STEP 3: FINAL FILTERING & SORTING
  let filtered = results.filter(r => {
    // Rule 1: Must match at least one ingredient
    if (r.matchedIngredients.length === 0) return false;
    
    // Rule 2: Relaxed Threshold to show more results
    // Only hide absolutely irrelevant stuff (score < 10)
    if (r.score < 10) return false;

    // Rule 3: User UI Filters
    if (filters.diet && (!r.recipe.diet || !r.recipe.diet.includes(filters.diet))) return false;
    if (filters.difficulty && r.recipe.difficulty && r.recipe.difficulty !== filters.difficulty) return false;
    if (filters.maxTime && r.recipe.cookTimeMin && r.recipe.cookTimeMin > filters.maxTime) return false;
    
    return true;
  });

  // Sort Highest Score First
  filtered.sort((a, b) => b.score - a.score);
  
  // Return ALL matches (No slice)
  return filtered; 
};
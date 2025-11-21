function scaleIngredients(ingredients, current, target){
  const multiplier = target/current;
  return ingredients.map(ing=>({...ing, qty: Number((ing.qty*multiplier).toFixed(2))}));
}
module.exports = scaleIngredients;

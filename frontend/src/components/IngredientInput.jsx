import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIngredients } from '../utils/recipeSlice';

const IngredientInput = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.recipe.ingredients);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const ing = inputValue.trim().toLowerCase();
    if (!ing) return;
    if (!ingredients.includes(ing)) {
      dispatch(setIngredients([...ingredients, ing]));
    }
    setInputValue('');
  };

  const handleRemove = (ingToRemove) => {
    dispatch(setIngredients(ingredients.filter(ing => ing !== ingToRemove)));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-3">
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="e.g. tomato" className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm text-sm sm:text-base" />
        <button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-sm active:scale-95 text-sm sm:text-base">Add</button>
      </div>
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {ingredients.map((ing, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 pl-3 pr-1 py-1 bg-white text-slate-600 text-xs sm:text-sm font-medium rounded-full border border-slate-200 shadow-sm">
              {ing}
              <button onClick={() => handleRemove(ing)} className="p-1 hover:bg-red-50 hover:text-red-500 rounded-full text-slate-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientInput;

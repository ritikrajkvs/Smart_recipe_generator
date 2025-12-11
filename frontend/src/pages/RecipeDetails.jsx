import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addFavoriteID, removeFavoriteID } from '../utils/userSlice';
import { addRating } from '../utils/recipeSlice';

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const ratings = useSelector((store) => store.recipe.ratings);
  const favorites = user?.favorites || [];

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(1);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes/${id}`);
        const data = await res.json();
        if (data.success) setRecipe(data.recipe);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchRecipe();
  }, [id]);

  const isFavorite = favorites.includes(id);
  const userRating = ratings[id] || 0;

  const handleToggle = async () => {
    if (isFavorite) dispatch(removeFavoriteID(id));
    else dispatch(addFavoriteID(id));

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/favorites/${id}`, {}, {
        headers: { 'x-auth-token': token }
      });
    } catch (err) { console.error(err); }
  };

  const rateRecipe = (r) => dispatch(addRating({ id, rating: r }));
  
  const scaledIngredients = (recipe && recipe.ingredients) ? recipe.ingredients.map(ing => ({ ...ing, qty: Number((ing.qty * servings).toFixed(2)) })) : [];
  const increaseServings = () => setServings(servings + 1);
  const decreaseServings = () => servings > 1 && setServings(servings - 1);

  const NutritionBar = ({ label, value, maxVal, color }) => {
    const percentage = Math.min((value / maxVal) * 100, 100);
    const barColor = color === 'blue' ? 'bg-blue-500' : color === 'orange' ? 'bg-orange-500' : 'bg-red-500';
    return <div className="space-y-1"><div className="flex justify-between text-sm"><span className={`font-medium text-${color}-700`}>{label}</span><span className="font-bold">{value}g</span></div><div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden"><div className={barColor + ' h-full'} style={{ width: `${percentage}%` }}></div></div></div>;
  };

  if (loading) return <div className="flex justify-center pt-32"><div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div></div>;
  if (!recipe) return <p className="p-10 text-center text-slate-500">Recipe not found.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 pb-20">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"><div><span className="text-green-600 font-bold uppercase tracking-wider text-xs">{recipe.cuisine} Cuisine</span><h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">{recipe.title}</h1><p className="text-slate-500 mt-2 text-lg">{recipe.description}</p></div></div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-6"><div className="flex items-center gap-2"><p className="text-slate-500 text-sm font-bold uppercase mr-2">Rate:</p>{[1, 2, 3, 4, 5].map(s => <button key={s} onClick={() => rateRecipe(s)} className={`text-2xl transition-transform hover:scale-110 ${userRating >= s ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-200'}`}>★</button>)}</div><button onClick={handleToggle} className={`p-3 rounded-full transition-all text-sm font-semibold flex items-center gap-2 ${isFavorite ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>{isFavorite ? 'Saved' : 'Save Recipe'}</button></div>
        <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6 mt-6"><div className="text-center border-r border-slate-100"><p className="text-slate-400 text-xs font-bold uppercase">Time</p><p className="text-xl font-bold text-slate-800">⏱ {recipe.cookTimeMin} <span className="text-sm font-normal">min</span></p></div><div className="text-center border-r border-slate-100"><p className="text-slate-400 text-xs font-bold uppercase">Difficulty</p><p className={`text-xl font-bold ${recipe.difficulty === 'Easy' ? 'text-green-600' : recipe.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{recipe.difficulty}</p></div><div className="text-center"><p className="text-slate-400 text-xs font-bold uppercase">Calories (Total)</p><p className="text-xl font-bold text-slate-800">🔥 {Math.round(recipe.nutrition.calories * servings)}</p></div></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8"><div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"><div className="flex justify-between items-center border-b pb-4 mb-4"><h3 className="font-extrabold text-2xl text-slate-800">Ingredients</h3><div className="flex items-center bg-slate-100 rounded-full p-1 shadow-inner"><button onClick={decreaseServings} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:text-green-600 font-bold">-</button><span className="w-16 text-center font-bold text-slate-800">{servings} Servings</span><button onClick={increaseServings} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:text-green-600 font-bold">+</button></div></div><ul className="space-y-2">{scaledIngredients.map((ing, idx) => <li key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"><span className="text-slate-700 capitalize font-medium">{ing.name}</span><span className="text-slate-600 text-sm font-semibold">{ing.qty} {ing.unit}</span></li>)}</ul></div><div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-lg"><h3 className="font-extrabold text-xl text-green-800 mb-4 border-b border-green-200 pb-3">Nutrition Breakdown</h3><div className="space-y-4"><NutritionBar label="Protein" value={Math.round(recipe.nutrition.protein_g * servings)} maxVal={50} color="blue" /><NutritionBar label="Carbs" value={Math.round(recipe.nutrition.carbs_g * servings)} maxVal={100} color="orange" /><NutritionBar label="Fat" value={Math.round(recipe.nutrition.fat_g * servings)} maxVal={40} color="red" /><div className="flex justify-between text-base pt-3 border-t border-green-200 mt-4"><span className="font-bold text-green-700">Total Calories</span><span className="font-extrabold text-xl text-green-900">{Math.round(recipe.nutrition.calories * servings)}</span></div></div></div></div>
        <div className="lg:col-span-2"><div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"><h2 className="text-3xl font-extrabold text-slate-800 mb-6 border-b pb-4">Instructions</h2><div className="space-y-6">{recipe.steps.map((step, idx) => <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition-shadow group"><div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl ring-2 ring-green-300 group-hover:bg-green-600 transition-colors">{idx + 1}</div><div className="pt-1"><p className="text-slate-700 leading-relaxed text-lg">{step}</p></div></div>)}</div></div></div>
      </div>
    </div>
  );
};

export default RecipeDetails;

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RecipeDetails = () => {
  const { id } = useParams();
  const { favorites, setFavorites, ratings, setRatings } = useContext(AppContext);
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

  const toggleFavorite = () => {
    if (isFavorite) setFavorites(favorites.filter(f => f !== id));
    else setFavorites([...favorites, id]);
  };

  const rateRecipe = (r) => setRatings({ ...ratings, [id]: r });

  // Scale ingredients
  const scaledIngredients = recipe ? recipe.ingredients.map(ing => ({
    ...ing,
    qty: Number((ing.qty * servings).toFixed(2))
  })) : [];

  if (loading) return <div className="flex justify-center pt-32"><div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div></div>;
  if (!recipe) return <p className="p-10 text-center text-slate-500">Recipe not found.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 pb-20">
      
      {/* Header Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <span className="text-green-600 font-bold uppercase tracking-wider text-xs">{recipe.cuisine} Cuisine</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">{recipe.title}</h1>
            <p className="text-slate-500 mt-2 text-lg">{recipe.description}</p>
          </div>
          
          <div className="flex gap-2">
             <button onClick={toggleFavorite} className={`p-3 rounded-full transition-all ${isFavorite ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
             </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
          <div className="text-center border-r border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase">Time</p>
            <p className="text-xl font-bold text-slate-800">⏱ {recipe.cookTimeMin} <span className="text-sm font-normal">min</span></p>
          </div>
          <div className="text-center border-r border-slate-100">
            <p className="text-slate-400 text-xs font-bold uppercase">Difficulty</p>
            <p className={`text-xl font-bold ${recipe.difficulty === 'Easy' ? 'text-green-600' : recipe.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
              {recipe.difficulty}
            </p>
          </div>
          <div className="text-center">
            <p className="text-slate-400 text-xs font-bold uppercase">Calories</p>
            <p className="text-xl font-bold text-slate-800">🔥 {Math.round(recipe.nutrition.calories * servings)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Ingredients & Nutrition */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Serving Control */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Servings</h3>
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <button onClick={() => servings > 1 && setServings(servings - 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:text-green-600 font-bold">-</button>
                <span className="w-8 text-center font-bold text-slate-800">{servings}</span>
                <button onClick={() => setServings(servings + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:text-green-600 font-bold">+</button>
              </div>
            </div>
          </div>

          {/* Ingredients List */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-xl text-slate-800 mb-4">Ingredients</h3>
            <ul className="space-y-3">
              {scaledIngredients.map((ing, idx) => (
                <li key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors group">
                  <span className="text-slate-700 capitalize font-medium">{ing.name}</span>
                  <span className="text-slate-500 text-sm bg-slate-100 px-2 py-1 rounded group-hover:bg-white">{ing.qty} {ing.unit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nutrition Card */}
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
            <h3 className="font-bold text-green-800 mb-4">Nutrition per serving</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Protein</span>
                <span className="font-bold text-green-900">{recipe.nutrition.protein_g}g</span>
              </div>
              <div className="w-full bg-green-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{width: `${Math.min(recipe.nutrition.protein_g * 2, 100)}%`}}></div>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <span className="text-green-700">Carbs</span>
                <span className="font-bold text-green-900">{recipe.nutrition.carbs_g}g</span>
              </div>
              <div className="w-full bg-green-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{width: `${Math.min(recipe.nutrition.carbs_g, 100)}%`}}></div>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <span className="text-green-700">Fats</span>
                <span className="font-bold text-green-900">{recipe.nutrition.fat_g}g</span>
              </div>
              <div className="w-full bg-green-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{width: `${Math.min(recipe.nutrition.fat_g * 3, 100)}%`}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Instructions */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Instructions</h2>
            <div className="space-y-6">
              {recipe.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-slate-700 leading-relaxed text-lg">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Section */}
          <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-100 text-center">
            <p className="text-slate-500 mb-2 text-sm uppercase tracking-wide font-bold">Did you like this recipe?</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(s => (
                <button 
                  key={s} 
                  onClick={() => rateRecipe(s)} 
                  className={`text-3xl transition-transform hover:scale-110 ${userRating >= s ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-200'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecipeDetails;

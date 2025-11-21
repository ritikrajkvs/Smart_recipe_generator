import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Import AppContext

const RecipeCard = ({ data }) => {
  const navigate = useNavigate();
  const { recipe, score, matchedIngredients, missingIngredients } = data;
  
  // 1. Access state and function from context
  const { favorites, toggleFavorite } = useContext(AppContext);
  const isFavorite = favorites.includes(recipe.id);

  // 2. Define the toggle function
  const handleToggle = (e) => {
    // Stop the click from triggering navigation to the details page
    e.stopPropagation(); 
    toggleFavorite(recipe.id);
  };

  // Helper for card styling (from previous steps)
  const getCuisineStyle = (cuisine) => {
    const styles = {
      Indian: { bg: 'from-orange-400 to-red-500', icon: '🍛' },
      Chinese: { bg: 'from-red-500 to-rose-600', icon: '🍜' },
      Italian: { bg: 'from-green-500 to-emerald-600', icon: '🍝' },
      Continental: { bg: 'from-blue-400 to-indigo-500', icon: '🥗' },
      Beverage: { bg: 'from-yellow-400 to-orange-400', icon: '🥤' },
      Mexican: { bg: 'from-yellow-500 to-orange-600', icon: '🌮' },
      default: { bg: 'from-gray-400 to-slate-500', icon: '🍽️' }
    };
    return styles[cuisine] || styles.default;
  };

  const style = getCuisineStyle(recipe.cuisine);

  return (
    <div 
      // Main card click navigates to details
      onClick={() => navigate(`/recipe/${recipe.id}`)} 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 overflow-hidden flex flex-col h-full hover:-translate-y-1"
    >
      
      {/* Decorative Header with Save Button */}
      <div className={`h-24 bg-gradient-to-r ${style.bg} relative p-4 flex justify-between items-start`}>
        <span className="text-4xl shadow-sm filter drop-shadow-lg">{style.icon}</span>
        
        {/* 3. The Save/Favorite Button */}
        <button 
          onClick={handleToggle} // Call the toggle function
          className={`p-2 rounded-full transition-all text-xl absolute top-4 right-4 z-10
            ${isFavorite 
              ? 'bg-white text-red-500 shadow-lg transform scale-110' // Saved state
              : 'text-white/80 hover:text-white/100 hover:bg-black/10' // Unsaved state
            }`}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
        
        <span className="absolute bottom-2 left-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
          {score}% Match
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
          {recipe.title}
        </h2>
        
        <div className="flex flex-wrap gap-2 text-xs mb-4 text-slate-600 font-medium">
          <span className="bg-slate-100 px-2 py-1 rounded-md flex items-center gap-1">⏱ {recipe.cookTimeMin}m</span>
          <span className={`px-2 py-1 rounded-md flex items-center gap-1 ${
            recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
            recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
            'bg-red-100 text-red-700'
          }`}>🔥 {recipe.difficulty}</span>
          <span className="bg-slate-100 px-2 py-1 rounded-md">🌍 {recipe.cuisine}</span>
        </div>

        <div className="space-y-2 mt-auto text-xs">
          {matchedIngredients?.length > 0 && (<div className="text-green-700 bg-green-50 p-2 rounded-lg border border-green-100"><span className="font-bold block mb-1">✓ You have:</span> <span className="line-clamp-1 text-green-600">{matchedIngredients.join(', ')}</span></div>)}
          {missingIngredients?.length > 0 && (<div className="text-red-700 bg-red-50 p-2 rounded-lg border border-red-100"><span className="font-bold block mb-1">✗ You need:</span> <span className="line-clamp-1 text-red-500 opacity-80">{missingIngredients.join(', ')}</span></div>)}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

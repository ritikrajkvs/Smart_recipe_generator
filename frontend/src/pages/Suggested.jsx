import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';

const Suggested = () => {
  const { favorites, ratings } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ALL recipes to analyze preferences
  const loadRecipes = async () => {
    setLoading(true);
    try {
      // FIX: Use Env Var & remove 'ingredients=tomato' to get general recommendations
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes`);
      const data = await res.json();
      if (data.success) {
        setRecipes(data.results.map(r => r.recipe));
      }
    } catch (err) {
      console.error("Failed to load suggestions", err);
    }
    setLoading(false);
  };

  // Algorithm to rank recipes based on User Favorites & Ratings
  const computeSuggestions = () => {
    if (recipes.length === 0) return;

    let scored = recipes.map(r => {
      let score = 0;

      // 1. Boost if Cuisine matches a Favorite
      favorites.forEach(fid => {
        const fav = recipes.find(x => x.id === fid);
        if (fav && fav.cuisine === r.cuisine) score += 20;
      });

      // 2. Boost if User Rated this recipe highly
      if (ratings[r.id] >= 4) score += 30;
      
      // 3. Boost by Global Popularity
      score += (r.popularity || 0) * 5;

      return { recipe: r, score };
    });

    // Sort by calculated score
    scored.sort((a, b) => b.score - a.score);
    
    // Take Top 10
    setSuggestions(scored.slice(0, 10));
  };

  useEffect(() => { loadRecipes(); }, []);
  useEffect(() => { computeSuggestions(); }, [recipes, favorites, ratings]);

  return (
    <div className="p-5 max-w-6xl mx-auto mt-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          Recommended <span className="text-green-600">For You</span>
        </h1>
        <p className="text-slate-500">Based on your favorites and popular choices.</p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => <RecipeCardSkeleton key={i} />)}
        </div>
      )}

      {!loading && suggestions.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-slate-400">No suggestions yet.</p>
          <p className="text-slate-500 mt-2">Start liking recipes to get personalized picks!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((s, i) => (
          <RecipeCard 
            key={i} 
            data={{
              recipe: s.recipe, 
              score: Math.min(99, 70 + (i * 2)), // Visual "Match Score" just for UI flavor
              matchedIngredients: [], 
              missingIngredients: []
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Suggested;

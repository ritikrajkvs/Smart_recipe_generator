import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';
import FilterPanel from '../components/FilterPanel';
import ErrorMessage from '../components/ErrorMessage';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';

const Results = () => {
  const { ingredients } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const query = ingredients.join(', ');

  const fetchRecipes = async () => {
    if (ingredients.length === 0) {
      setError('No ingredients selected. Please go back and add ingredients.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        ingredients: ingredients.join(','),
        diet: filters.diet || '',
        difficulty: filters.difficulty || '',
        maxTime: filters.maxTime || ''
      });

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes?${params.toString()}`);
      const data = await res.json();
      if (data.success) setRecipes(data.results);
      else setError('Failed to fetch recipes.');
    } catch (err) {
      console.error(err);
      setError('Server error. Please check backend connection.');
    }
    setLoading(false);
  };

  useEffect(() => { fetchRecipes(); }, []);
  useEffect(() => { fetchRecipes(); }, [filters]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Found <span className="text-green-600">{recipes.length}</span> Recipes
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Based on your ingredients: <span className="font-semibold text-slate-700">{query || 'None'}</span>
          </p>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left: Filters (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <FilterPanel onApplyFilters={setFilters} />
            </div>
          </div>

          {/* Right: Results Grid */}
          <div className="lg:col-span-3">
            
            {error && <ErrorMessage message={error} />}
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => <RecipeCardSkeleton key={i} />)}
              </div>
            ) : recipes.length === 0 && !error ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="text-6xl mb-4">🍳</div>
                <h3 className="text-xl font-bold text-slate-800">No recipes found</h3>
                <p className="text-slate-500 max-w-md mt-2">
                  Try adjusting your filters or adding different ingredients to get better results.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recipes.map((item, index) => (
                  <div 
                    key={item.recipe.id} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }} // Staggered animation
                  >
                    <RecipeCard data={item} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Results;

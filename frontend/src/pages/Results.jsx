import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';
import FilterPanel from '../components/FilterPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';
const Results = ()=>{
  const { ingredients } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const query = ingredients.join(',');
  const fetchRecipes = async ()=>{
    if(ingredients.length===0){ setError('No ingredients selected. Please go back and add ingredients.'); return; }
    setLoading(true); setError('');
    try{
      const params = new URLSearchParams({ ingredients: query, diet: filters.diet||'', difficulty: filters.difficulty||'', maxTime: filters.maxTime||'' });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes?${params.toString()}`);
      const data = await res.json();
      if(data.success) setRecipes(data.results); else setError('Failed to fetch recipes.');
    }catch(err){ console.error(err); setError('Server error. Please check backend connection.'); }
    setLoading(false);
  };
  useEffect(()=>{ fetchRecipes(); },[]);
  useEffect(()=>{ fetchRecipes(); },[filters]);
  return (<div className="p-5 max-w-4xl mx-auto mt-20"><h1 className="text-2xl font-bold mb-3">Results for: <span className="text-blue-600">{query||'None'}</span></h1>{error && <ErrorMessage message={error} />}<FilterPanel onApplyFilters={setFilters} />{loading && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{[...Array(4)].map((_,i)=><RecipeCardSkeleton key={i}/>)}</div>}{!loading && recipes.length===0 && !error && <p className="text-gray-600 text-center mt-4">No recipes found. Try adjusting filters.</p>}{!loading && recipes.length>0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{recipes.map(item=> <RecipeCard key={item.recipe.id} data={item}/>)}</div>}</div>);
};
export default Results;

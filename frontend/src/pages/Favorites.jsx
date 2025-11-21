import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';
const Favorites = ()=>{
  const { favorites } = useContext(AppContext);
  const [favRecipes, setFavRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ const loadFavorites = async ()=>{ setLoading(true); try{ const results=[]; for(const id of favorites){ const res = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes/${id}`); const data = await res.json(); if(data.success) results.push({recipe: data.recipe, score:100, matchedIngredients:[], missingIngredients:[]}); } setFavRecipes(results);}catch(err){console.error(err);} setLoading(false); }; loadFavorites(); },[favorites]);
  return (<div className="p-5 max-w-4xl mx-auto mt-20"><h1 className="text-3xl font-bold mb-4">My Favorites ❤️</h1>{loading && <p>Loading favorites...</p>}{!loading && favorites.length===0 && <p className="text-gray-600">You have no saved recipes yet.</p>}<div className="grid grid-cols-1 md:grid-cols-2 gap-4">{favRecipes.map(item=><RecipeCard key={item.recipe.id} data={item}/>)}</div></div>);
};
export default Favorites;

import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';
const Suggested = ()=>{
  const { favorites, ratings } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const loadRecipes = async ()=>{ const res = await fetch('${import.meta.env.VITE_API_URL}/api/recipes?ingredients=tomato'); const data = await res.json(); if(data.success) setRecipes(data.results.map(r=>r.recipe)); };
  const computeSuggestions = ()=>{ let scored = recipes.map(r=>{ let score=0; favorites.forEach(fid=>{ const fav=recipes.find(x=>x.id===fid); if(fav && fav.cuisine===r.cuisine) score+=20; }); if(ratings[r.id]>=4) score+=30; score += (r.popularity||4)*2; return {recipe:r, score}; }); scored.sort((a,b)=>b.score-a.score); setSuggestions(scored.slice(0,10)); };
  useEffect(()=>{ loadRecipes(); },[]); useEffect(()=>{ if(recipes.length>0) computeSuggestions(); },[recipes, favorites, ratings]);
  return (<div className="p-5 max-w-4xl mx-auto mt-20"><h1 className="text-3xl font-bold mb-4">Recommended For You ⭐</h1>{suggestions.length===0 && <p className="text-gray-600">No suggestions yet. Rate or favorite recipes!</p>}<div className="grid grid-cols-1 md:grid-cols-2 gap-4">{suggestions.map((s,i)=><RecipeCard key={i} data={{recipe:s.recipe, score:s.score, matchedIngredients:[], missingIngredients:[]}}/>)}</div></div>);
};
export default Suggested;

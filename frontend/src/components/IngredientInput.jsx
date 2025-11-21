import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
const IngredientInput = ()=>{
  const { ingredients, setIngredients } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const handleAdd = ()=>{ const ing = inputValue.trim().toLowerCase(); if(!ing) return; if(!ingredients.includes(ing)) setIngredients([...ingredients, ing]); setInputValue(''); };
  const handleRemove = (n)=> setIngredients(ingredients.filter(i=>i!==n));
  const handleKey = (e)=>{ if(e.key==='Enter') handleAdd(); };
  return (<div className="mt-5"><h2 className="text-lg font-semibold mb-2">Add Ingredients Manually</h2><div className="flex gap-2"><input value={inputValue} onChange={e=>setInputValue(e.target.value)} onKeyPress={handleKey} placeholder="e.g. tomato" className="flex-1 border p-2 rounded" /><button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">Add</button></div>{ingredients.length>0 && <div className="flex flex-wrap gap-2 mt-4">{ingredients.map((ing,idx)=>(<span key={idx} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full">{ing}<button className="text-red-500 font-bold" onClick={()=>handleRemove(ing)}>×</button></span>))}</div>}</div>);
};
export default IngredientInput;

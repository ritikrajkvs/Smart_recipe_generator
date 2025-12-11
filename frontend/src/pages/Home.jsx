import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIngredients } from '../utils/recipeSlice';
import ImageUploader from '../components/ImageUploader';
import IngredientInput from '../components/IngredientInput';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector((store) => store.recipe.ingredients);

  const handleSearch = () => {
    if (ingredients.length === 0) {
      alert('Please upload an image or add ingredients first!');
      return;
    }
    navigate('/results');
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-20 px-4 relative w-full overflow-x-hidden bg-slate-50 font-sans selection:bg-green-100 selection:text-green-700">
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200/40 rounded-full blur-3xl animate-blob will-change-transform"></div>
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-blob animation-delay-2000 will-change-transform"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-12 max-w-3xl px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-green-100 shadow-sm mb-6 hover:shadow-md transition-shadow">
            <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span></span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-600 tracking-widest uppercase">AI Kitchen Assistant</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-emerald-700 underline decoration-green-300/30 decoration-4 underline-offset-4">Leftovers</span> into <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 underline decoration-orange-300/30 decoration-4 underline-offset-4">Lunch.</span></h1>
          <p className="text-base sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">Stop wondering "what's for dinner?". Snap a photo of your fridge, and let AI generate the perfect recipe instantly.</p>
        </div>

        <div className="w-full bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/60 p-3 sm:p-4 mb-20 ring-1 ring-slate-100/50 transform-gpu">
          <div className="bg-white rounded-[2rem] px-4 sm:px-8 py-10 border border-slate-50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-50"></div>
            <div className="flex items-center justify-center gap-6 mb-10"><div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-slate-200"></div><span className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">Input Method</span><div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-slate-200"></div></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-start relative">
              <div className="flex flex-col items-center w-full px-4">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl text-blue-600 shadow-inner mb-4">📸</div>
                <div className="text-center space-y-2 mb-6 h-16"><h3 className="font-bold text-slate-900 text-xl">Photo Scan</h3><p className="text-slate-500 text-sm max-w-[250px] mx-auto">Upload a photo of your pantry or fridge shelves.</p></div>
                <div className="w-full max-w-sm bg-slate-50/50 p-2 rounded-2xl border border-slate-100"><ImageUploader onIngredientsDetected={(detected) => dispatch(setIngredients([...new Set(detected)]))} /></div>
              </div>
              <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-slate-100 -translate-x-1/2"></div>
              <div className="flex flex-col items-center w-full px-4">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl text-orange-600 shadow-inner mb-4">📝</div>
                <div className="text-center space-y-2 mb-6 h-16"><h3 className="font-bold text-slate-900 text-xl">Manual List</h3><p className="text-slate-500 text-sm max-w-[250px] mx-auto">Type ingredients you already have on hand.</p></div>
                <div className="w-full max-w-sm bg-slate-50/50 p-4 rounded-2xl border border-slate-100"><IngredientInput /></div>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <button onClick={handleSearch} disabled={ingredients.length === 0} className={`relative group w-full sm:w-auto px-12 py-5 rounded-full text-lg font-bold text-white shadow-xl shadow-green-200/80 overflow-hidden transition-all duration-300 ${ingredients.length > 0 ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-2xl hover:shadow-green-400/40 hover:-translate-y-1 active:scale-95 cursor-pointer' : 'bg-slate-300 cursor-not-allowed grayscale'}`}>
                <span className="relative z-10 flex items-center justify-center gap-3">Find Matching Recipes <span className="group-hover:translate-x-1 transition-transform duration-300">➜</span></span>
                {ingredients.length > 0 && <span className="absolute -top-2 -right-2 bg-white text-green-600 text-xs font-extrabold w-7 h-7 flex items-center justify-center rounded-full border-2 border-green-50 shadow-md animate-bounce z-20">{ingredients.length}</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

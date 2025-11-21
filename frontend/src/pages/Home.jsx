import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import IngredientInput from '../components/IngredientInput';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const { ingredients, setIngredients } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (ingredients.length === 0) {
      alert('Please upload an image or add ingredients first!');
      return;
    }
    navigate('/results');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative w-full overflow-x-hidden bg-slate-50 font-sans">
      
      {/* --- Background Decorations (Optimized with transform-gpu) --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob transform-gpu"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 transform-gpu"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000 transform-gpu"></div>

      {/* Floating Ingredients */}
      <div className="hidden lg:block absolute top-32 left-20 text-6xl animate-float opacity-80 transform-gpu">🍅</div>
      <div className="hidden lg:block absolute top-40 right-20 text-6xl animate-float delay-100 opacity-80 transform-gpu">🥦</div>
      <div className="hidden lg:block absolute bottom-40 left-32 text-6xl animate-float delay-200 opacity-80 transform-gpu">🧀</div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* --- Hero Section --- */}
        <div className="text-center mb-12 max-w-2xl px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-wide mb-6 border border-green-200 uppercase">
            ✨ AI-Powered Kitchen Assistant
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Leftovers</span> into <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Lunch.</span>
          </h1>
          <p className="text-lg text-slate-600">
            Stop wondering "what's for dinner?". Snap a photo of your fridge, and let AI generate the perfect recipe instantly.
          </p>
        </div>

        {/* --- Main Input Card --- */}
        <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/60 border border-white p-1 md:p-8 mb-16 transform-gpu">
          <div className="bg-white rounded-2xl p-6 md:p-10 border border-slate-100 shadow-inner">
            
            {/* Input Method Header */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-slate-200"></div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Input Method</span>
              <div className="h-px w-12 bg-slate-200"></div>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-10 md:divide-x md:divide-slate-100">
              
              {/* Column 1: Image Scan */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-4">
                <div className="bg-blue-50 p-3 rounded-full w-12 h-12 flex items-center justify-center text-2xl mb-2">📸</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Photo Scan</h3>
                  <p className="text-sm text-slate-500">Upload a photo of your pantry or fridge shelves.</p>
                </div>
                <div className="w-full">
                  <ImageUploader 
                    onIngredientsDetected={(detected) => 
                      setIngredients([...new Set(detected)])
                    } 
                  />
                </div>
              </div>

              {/* Column 2: Manual Input */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-4 md:pl-10">
                <div className="bg-orange-50 p-3 rounded-full w-12 h-12 flex items-center justify-center text-2xl mb-2">📝</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Manual List</h3>
                  <p className="text-sm text-slate-500">Type ingredients you already have on hand.</p>
                </div>
                <div className="w-full">
                  <IngredientInput />
                </div>
              </div>
            </div>

            {/* Big Action Button */}
            <div className="mt-12 flex justify-center">
              <button 
                onClick={handleSearch}
                disabled={ingredients.length === 0}
                className={`relative px-12 py-4 rounded-full text-lg font-bold text-white transition-all transform shadow-xl 
                  ${ingredients.length > 0 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-105 hover:shadow-green-300/50 cursor-pointer' 
                    : 'bg-slate-300 cursor-not-allowed'
                  }`}
              >
                Find Matching Recipes ➜
              </button>
            </div>
          </div>
        </div>

        {/* --- Feature Highlights --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
          {[
            { icon: '🗑️', title: 'Reduce Waste', desc: 'Use what you have before it goes bad.' },
            { icon: '💰', title: 'Save Money', desc: 'Cook at home instead of ordering out.' },
            { icon: '⚡', title: 'Save Time', desc: 'No more scrolling for hours to decide.' },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center md:text-left transform-gpu">
              <div className="text-4xl mb-3 bg-slate-50 w-16 h-16 mx-auto md:mx-0 rounded-full flex items-center justify-center shadow-inner">{feature.icon}</div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;

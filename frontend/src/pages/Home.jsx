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
    <div className="min-h-screen pt-28 pb-20 px-4 relative w-full overflow-x-hidden bg-slate-50 font-sans">
      
      {/* --- High Performance Background (Fixed) --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200/40 rounded-full blur-3xl animate-blob will-change-transform"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-blob animation-delay-2000 will-change-transform"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-blob animation-delay-4000 will-change-transform"></div>
      </div>

      {/* Floating Ingredients (Decorations) */}
      <div className="hidden lg:block absolute top-32 left-20 text-6xl animate-float opacity-90 transform-gpu">🍅</div>
      <div className="hidden lg:block absolute top-40 right-20 text-6xl animate-float delay-100 opacity-90 transform-gpu">🥦</div>
      <div className="hidden lg:block absolute bottom-40 left-32 text-6xl animate-float delay-200 opacity-90 transform-gpu">🧀</div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* --- Hero Section --- */}
        <div className="text-center mb-14 max-w-3xl px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">AI Kitchen Assistant</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Leftovers</span> into <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Lunch.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Stop wondering "what's for dinner?". Snap a photo of your fridge, and let our AI generate the perfect recipe instantly.
          </p>
        </div>

        {/* --- Main Interaction Card (The "Previous" Layout, Upgraded) --- */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-2 md:p-4 mb-16 transform-gpu">
          <div className="bg-white rounded-[2rem] px-6 py-10 md:px-12 border border-slate-50">
            
            {/* Stylish Divider Header */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-200"></div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] bg-slate-50 px-3 py-1 rounded-full">Choose Input Method</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-200"></div>
            </div>

            {/* The Classic Two-Column Layout */}
            <div className="grid md:grid-cols-2 gap-12 md:divide-x md:divide-slate-100">
              
              {/* Left: Photo Scan */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-5">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl text-blue-600">📸</div>
                  <h3 className="font-bold text-slate-900 text-xl">Photo Scan</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Upload a photo of your pantry or fridge shelves. We'll identify ingredients for you.
                </p>
                <div className="w-full pt-2">
                  <ImageUploader 
                    onIngredientsDetected={(detected) => 
                      setIngredients([...new Set(detected)])
                    } 
                  />
                </div>
              </div>

              {/* Right: Manual List */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-5 md:pl-12">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-xl text-orange-600">📝</div>
                  <h3 className="font-bold text-slate-900 text-xl">Manual List</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Type ingredients you already have on hand. Perfect for specific leftovers.
                </p>
                <div className="w-full pt-2">
                  <IngredientInput />
                </div>
              </div>
            </div>

            {/* Big Gradient Action Button */}
            <div className="mt-12 flex justify-center">
              <button 
                onClick={handleSearch}
                disabled={ingredients.length === 0}
                className={`relative group px-10 py-4 rounded-full text-lg font-bold text-white transition-all duration-300 shadow-xl 
                  ${ingredients.length > 0 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-105 hover:shadow-green-500/30 cursor-pointer' 
                    : 'bg-slate-300 cursor-not-allowed grayscale'
                  }`}
              >
                <span className="flex items-center gap-2">
                  Find Matching Recipes 
                  <span className="group-hover:translate-x-1 transition-transform">➜</span>
                </span>
                
                {/* Ingredient Counter Badge */}
                {ingredients.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-extrabold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-md animate-bounce">
                    {ingredients.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* --- Feature Highlights (Clean & Minimal) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
          {[
            { icon: '🗑️', title: 'Reduce Waste', desc: 'Use what you have before it goes bad.', color: 'bg-green-50' },
            { icon: '💰', title: 'Save Money', desc: 'Cook at home instead of ordering out.', color: 'bg-yellow-50' },
            { icon: '⚡', title: 'Save Time', desc: 'No more scrolling for hours to decide.', color: 'bg-blue-50' },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;

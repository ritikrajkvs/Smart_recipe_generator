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
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-4 relative w-full overflow-x-hidden bg-slate-50 font-sans selection:bg-green-100 selection:text-green-700">

      {/* Background Elements — optimized for mobile to avoid heavy blur overflow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] sm:w-96 h-[60%] sm:h-96 bg-green-200/40 rounded-full blur-3xl animate-blob will-change-transform"></div>

        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[60%] sm:w-96 h-[60%] sm:h-96 bg-blue-200/40 rounded-full blur-3xl animate-blob animation-delay-2000 will-change-transform"></div>
      </div>

      {/* Floating Emojis — disabled on mobile for layout stability */}
      <div className="hidden lg:block absolute top-32 left-20 text-7xl animate-float opacity-80 drop-shadow-2xl">🍅</div>
      <div className="hidden lg:block absolute top-40 right-20 text-7xl animate-float delay-100 opacity-80 drop-shadow-2xl">🥦</div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">

        {/* HERO SECTION */}
        <div className="text-center mb-10 sm:mb-16 max-w-4xl px-2">

          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white border border-green-100 shadow-sm mb-6 sm:mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-600 tracking-widest uppercase">AI Kitchen Assistant</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-4 sm:mb-6 leading-tight break-words">
            Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-emerald-700 underline decoration-green-300/30 decoration-4 underline-offset-4">Leftovers</span> into <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 underline decoration-orange-300/30 decoration-4 underline-offset-4">Lunch.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed px-2">
            Stop wondering "what's for dinner?". Snap a photo of your fridge, and let AI generate the perfect recipe instantly.
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="w-full bg-white/80 backdrop-blur-sm rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-white/60 p-2 sm:p-3 mb-16 sm:mb-20 ring-1 ring-slate-100/50 transform-gpu">
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] px-4 sm:px-6 py-8 sm:py-12 md:px-16 border border-slate-50 shadow-sm relative overflow-hidden">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 sm:w-1/3 h-1 bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-50"></div>

            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 whitespace-nowrap">
              <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-slate-200"></div>
              <span className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">Input Method</span>
              <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-slate-200"></div>
            </div>

            {/* RESPONSIVE FIX — grid replaced with stack-first layout */}
            <div className="grid md:grid-cols-2 gap-10 sm:gap-16 md:divide-x md:divide-slate-100 items-start">

              {/* PHOTO SCAN */}
              <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl text-blue-600 shadow-inner group-hover:scale-110 transition-all duration-300">📸</div>

                <div className="space-y-1 sm:space-y-2">
                  <h3 className="font-bold text-slate-900 text-lg sm:text-xl group-hover:text-blue-600 transition-colors">Photo Scan</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">Upload a photo of your pantry or fridge shelves.</p>
                </div>

                <div className="w-full pt-2 overflow-hidden">
                  <ImageUploader onIngredientsDetected={(detected) => setIngredients([...new Set(detected)])} />
                </div>
              </div>

              {/* MANUAL LIST */}
              <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 md:pl-16 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl text-orange-600 shadow-inner group-hover:scale-110 transition-all duration-300">📝</div>

                <div className="space-y-1 sm:space-y-2">
                  <h3 className="font-bold text-slate-900 text-lg sm:text-xl group-hover:text-orange-600 transition-colors">Manual List</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">Type ingredients you already have on hand.</p>
                </div>

                <div className="w-full pt-2 overflow-hidden">
                  <IngredientInput />
                </div>
              </div>

            </div>

            {/* SEARCH BUTTON */}
            <div className="mt-12 sm:mt-16 flex justify-center">
              <button 
                onClick={handleSearch}
                disabled={ingredients.length === 0}
                className={`relative group px-10 py-4 sm:px-12 sm:py-5 rounded-full text-base sm:text-lg font-bold text-white shadow-xl shadow-green-200/80 overflow-hidden transition-all duration-300
                  ${ingredients.length > 0 ? 
                    'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-2xl hover:-translate-y-1 active:scale-95 cursor-pointer' 
                    : 'bg-slate-300 cursor-not-allowed grayscale'}`}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Find Matching Recipes 
                  <span className="group-hover:translate-x-1 transition-transform">➜</span>
                </span>

                {ingredients.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-green-600 text-xs font-extrabold w-6 h-6 flex items-center justify-center rounded-full border-2 border-green-50 shadow-md animate-bounce z-20">
                    {ingredients.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* FEATURE HIGHLIGHTS — fixed overflow & spacing on small screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-2 sm:px-4">

          {[
            { icon: '🗑️', title: 'Reduce Waste', desc: 'Use what you have before it goes bad.', color: 'bg-green-50 text-green-600' },
            { icon: '💰', title: 'Save Money', desc: 'Cook at home instead of ordering out.', color: 'bg-yellow-50 text-yellow-600' },
            { icon: '⚡', title: 'Save Time', desc: 'No more scrolling for hours to decide.', color: 'bg-blue-50 text-blue-600' },
          ].map((feature, i) => (
            <div 
              key={i} 
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.color} rounded-2xl flex items-center justify-center text-2xl sm:text-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>{feature.icon}</div>

              <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Home;

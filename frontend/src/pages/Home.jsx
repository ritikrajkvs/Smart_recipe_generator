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
    <div className="min-h-screen pt-28 pb-20 px-4 relative w-full overflow-hidden bg-slate-50">
      
      {/* --- Dynamic Background (Fixed for Performance) --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-300/30 rounded-full blur-[100px] animate-blob mix-blend-multiply"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-pink-300/30 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply"></div>
      </div>

      {/* --- Floating 3D Elements --- */}
      <div className="hidden lg:block absolute top-32 left-20 text-7xl animate-float opacity-90 drop-shadow-xl">🥗</div>
      <div className="hidden lg:block absolute top-40 right-20 text-7xl animate-float delay-100 opacity-90 drop-shadow-xl">🥑</div>
      <div className="hidden lg:block absolute bottom-40 left-32 text-7xl animate-float delay-200 opacity-90 drop-shadow-xl">🥕</div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* --- Hero Section --- */}
        <div className="text-center mb-16 max-w-3xl px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-sm font-semibold text-slate-600 tracking-wide">AI-POWERED CHEF</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
            Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 animate-text-shimmer">Fridge</span> into a <br className="hidden md:block" />
            <span className="relative inline-block">
              Feast.
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Don't know what to cook? Snap a photo of your ingredients, and let our AI generate the perfect recipe in seconds.
          </p>
        </div>

        {/* --- Main Interaction Card --- */}
        <div className="w-full bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 p-2 md:p-3 mb-20 ring-1 ring-slate-900/5">
          <div className="bg-white rounded-[2rem] px-6 py-12 md:p-12 shadow-sm">
            
            {/* Header */}
            <div className="flex flex-col items-center justify-center gap-3 mb-10">
              <h2 className="text-2xl font-bold text-slate-800">How do you want to start?</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:divide-x md:divide-slate-100 items-start">
              
              {/* Left: Scan */}
              <div className="flex flex-col items-center text-center space-y-5 px-4">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm text-blue-600 mb-2 transition-transform hover:scale-110 duration-300">
                  📸
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-xl">Photo Scan</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Upload a photo of your pantry or open fridge. <br/>We'll detect ingredients automatically.
                  </p>
                </div>
                <div className="w-full pt-2">
                  <ImageUploader 
                    onIngredientsDetected={(detected) => 
                      setIngredients([...new Set(detected)])
                    } 
                  />
                </div>
              </div>

              {/* Right: Manual */}
              <div className="flex flex-col items-center text-center space-y-5 px-4">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm text-orange-600 mb-2 transition-transform hover:scale-110 duration-300">
                  📝
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-xl">Manual Input</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Type ingredients you have on hand. <br/>Perfect for specific leftovers.
                  </p>
                </div>
                <div className="w-full pt-2">
                  <IngredientInput />
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="mt-14 flex justify-center">
              <button 
                onClick={handleSearch}
                disabled={ingredients.length === 0}
                className={`relative group px-10 py-5 rounded-full text-xl font-bold text-white transition-all duration-300 shadow-xl shadow-green-200
                  ${ingredients.length > 0 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-2xl hover:shadow-green-400/40 hover:-translate-y-1 active:scale-95' 
                    : 'bg-slate-300 cursor-not-allowed grayscale'
                  }`}
              >
                <span className="flex items-center gap-3">
                  Find Matching Recipes 
                  <span className="group-hover:translate-x-1 transition-transform">➜</span>
                </span>
                
                {ingredients.length > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full border-4 border-white shadow-lg animate-bounce">
                    {ingredients.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* --- Feature Highlights --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
          {[
            { icon: '🗑️', title: 'Reduce Waste', desc: 'Stop throwing away food. Use what you buy before it goes bad.', color: 'bg-green-50' },
            { icon: '💰', title: 'Save Money', desc: 'Cook at home instead of ordering takeout. It pays off fast.', color: 'bg-yellow-50' },
            { icon: '⚡', title: 'Save Time', desc: 'No more scrolling for hours. Get instant, tailored ideas.', color: 'bg-blue-50' },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;

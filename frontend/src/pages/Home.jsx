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
    <div
      className="min-h-screen pt-24 sm:pt-28 pb-20 px-4 relative w-full overflow-x-hidden bg-slate-50 font-sans selection:bg-green-100 selection:text-green-700"
      aria-live="polite"
    >
      {/* Background elements (use vw/vh so they scale, limited blur on small screens) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div
          className="absolute top-[-8vh] left-1/2 -translate-x-1/2 w-[60vw] max-w-[480px] h-[60vw] max-h-[480px] bg-green-200/40 rounded-full blur-3xl will-change-transform"
          style={{ filter: 'blur(40px)' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[-8vh] right-1/2 translate-x-1/2 w-[60vw] max-w-[480px] h-[60vw] max-h-[480px] bg-blue-200/40 rounded-full blur-3xl will-change-transform"
          style={{ filter: 'blur(40px)' }}
          aria-hidden="true"
        />
      </div>

      {/* Floating emojis only on large screens to avoid layout weight on small devices */}
      <div className="hidden lg:block absolute top-32 left-20 text-7xl animate-float opacity-80 drop-shadow-2xl pointer-events-none">🍅</div>
      <div className="hidden lg:block absolute top-40 right-20 text-7xl animate-float delay-100 opacity-80 drop-shadow-2xl pointer-events-none">🥦</div>

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center gap-8">

        {/* HERO */}
        <header className="text-center w-full px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-green-100 shadow-sm mb-4 sm:mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-600 tracking-widest uppercase">AI Kitchen Assistant</span>
          </div>

          {/* scalable typography using clamp so headline adapts smoothly */}
          <h1 className="font-extrabold text-slate-900 tracking-tight mb-3 leading-tight break-words"
              style={{ fontSize: 'clamp(1.8rem, 6.5vw, 3.75rem)', lineHeight: 1.03 }}>
            Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-emerald-700 underline decoration-green-300/30 decoration-4 underline-offset-4">Leftovers</span> into <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 underline decoration-orange-300/30 decoration-4 underline-offset-4">Lunch.</span>
          </h1>

          <p className="mx-auto text-slate-500" style={{ maxWidth: 680, fontSize: 'clamp(0.95rem, 2.2vw, 1.125rem)' }}>
            Stop wondering "what's for dinner?". Snap a photo of your fridge, and let AI generate the perfect recipe instantly.
          </p>
        </header>

        {/* MAIN INPUT CARD */}
        <section className="w-full bg-white/80 backdrop-blur-sm rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-white/60 p-3 sm:p-4 mb-6 ring-1 ring-slate-100/50 transform-gpu overflow-hidden">
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] px-4 sm:px-6 py-6 sm:py-10 border border-slate-50 shadow-sm relative overflow-hidden">

            {/* subtle decorative line - width responsive */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] sm:w-[33%] h-1 bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-50" />

            <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-10">
              <div className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-slate-200" />
              <span className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">Input Method</span>
              <div className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-slate-200" />
            </div>

            {/* use single-column on small screens, two-column on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

              {/* Photo Scan */}
              <div className="flex flex-col items-center text-center space-y-3 sm:space-y-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl text-blue-600 shadow-inner transition-transform duration-300">
                  📸
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg sm:text-xl">Photo Scan</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">Upload a photo of your pantry or fridge shelves.</p>
                </div>

                {/* Make uploader container responsive & prevent overflow */}
                <div className="w-full pt-2">
                  <div className="w-full max-w-full" style={{ minWidth: 0 }}>
                    <ImageUploader onIngredientsDetected={(detected) => setIngredients([...new Set(detected)])} />
                  </div>
                </div>
              </div>

              {/* Manual List */}
              <div className="flex flex-col items-center text-center space-y-3 sm:space-y-5 md:pl-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl text-orange-600 shadow-inner transition-transform duration-300">
                  📝
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg sm:text-xl">Manual List</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">Type ingredients you already have on hand.</p>
                </div>

                {/* Input wrapper prevents horizontal scroll from child components */}
                <div className="w-full pt-2">
                  <div className="w-full max-w-full" style={{ minWidth: 0 }}>
                    <IngredientInput />
                  </div>
                </div>
              </div>
            </div>

            {/* CTA: full-width on small screens for easy tapping */}
            <div className="mt-8 sm:mt-12 flex justify-center">
              <button
                onClick={handleSearch}
                disabled={ingredients.length === 0}
                className={`relative group px-6 sm:px-12 py-3 sm:py-5 rounded-full text-base sm:text-lg font-bold text-white shadow-xl shadow-green-200/80 overflow-hidden transition-all duration-200
                  ${ingredients.length > 0 ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95' : 'bg-slate-300 cursor-not-allowed grayscale'}`}
                style={{ width: 'min(560px, 100%)' }} // never exceed a comfortable tap width
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
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
        </section>

        {/* FEATURES */}
        <section className="w-full px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '🗑️', title: 'Reduce Waste', desc: 'Use what you have before it goes bad.' },
              { icon: '💰', title: 'Save Money', desc: 'Cook at home instead of ordering out.' },
              { icon: '⚡', title: 'Save Time', desc: 'No more scrolling for hours to decide.' },
            ].map((f, i) => (
              <article
                key={i}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/0 rounded-2xl flex items-center justify-center text-2xl mb-3">
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">{f.title}</h3>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed">{f.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Respect reduced motion preference */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-float, .animate-blob, .animate-ping, .animate-bounce { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;

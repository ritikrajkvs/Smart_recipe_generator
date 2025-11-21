import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { favorites } = useContext(AppContext);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">
            🥗
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent tracking-tight">
            RecipeGen
          </span>
        </Link>

        {/* Center Navigation Pills */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/50 backdrop-blur-md shadow-inner">
          <Link 
            to="/" 
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              isActive('/') 
                ? 'bg-white text-green-600 shadow-md transform scale-105' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
            }`}
          >
            Home
          </Link>
          
          <Link 
            to="/results" 
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              isActive('/results') 
                ? 'bg-white text-green-600 shadow-md transform scale-105' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
            }`}
          >
            Recipes
          </Link>

          <Link 
            to="/suggested" 
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              isActive('/suggested') 
                ? 'bg-white text-green-600 shadow-md transform scale-105' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
            }`}
          >
            For You
          </Link>
        </div>

        {/* Favorites Button (Distinct Style) */}
        <Link 
          to="/favorites" 
          className={`relative group flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 ${
            isActive('/favorites')
              ? 'bg-red-50 border-red-200 text-red-600 shadow-inner'
              : 'bg-white border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-500 hover:shadow-lg hover:-translate-y-0.5'
          }`}
        >
          <span className={`text-lg transition-transform duration-300 ${isActive('/favorites') ? 'scale-110' : 'group-hover:scale-125'}`}>
            ❤️
          </span>
          <span className="font-bold text-sm">Saved</span>
          
          {favorites.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm border-2 border-white animate-bounce">
              {favorites.length}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;

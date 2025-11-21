import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { favorites } = useContext(AppContext);

  const navItemClass = (path) => 
    `text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
      location.pathname === path 
        ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🥗</span>
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            RecipeGen
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-2">
          <Link to="/" className={navItemClass('/')}>Home</Link>
          <Link to="/results" className={navItemClass('/results')}>Recipes</Link>
          <Link to="/suggested" className={navItemClass('/suggested')}>For You</Link>
          <Link to="/favorites" className={navItemClass('/favorites')}>
            Saved
            {favorites.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
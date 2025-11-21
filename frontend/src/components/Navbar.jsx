import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { favorites, user, logout } = useContext(AppContext);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">🥗</div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent tracking-tight">RecipeGen</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/50 backdrop-blur-md shadow-inner">
          {['/', '/results', '/suggested'].map(path => (
            <Link key={path} to={path} className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${isActive(path) ? 'bg-white text-green-600 shadow-md transform scale-105' : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'}`}>
              {path === '/' ? 'Home' : path === '/results' ? 'Recipes' : 'For You'}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/favorites" className="relative group flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-bold transition hover:bg-red-100">
            ❤️ <span className="hidden sm:inline">Saved</span>
            {favorites.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">{favorites.length}</span>}
          </Link>

          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <span className="text-sm font-bold text-slate-700 hidden lg:block">Hi, {user.username}</span>
              <button onClick={logout} className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-slate-900 text-white px-5 py-2 rounded-full font-bold hover:bg-slate-800 transition shadow-lg">Login</Link>
          )}
        </div>

      </div>
    </nav>
  );
};
export default Navbar;

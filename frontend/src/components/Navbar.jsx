import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { favorites, user, logout } = useContext(AppContext);
  const isActive = (path) => location.pathname === path;

  // Helper to render Auth buttons based on current page
  const renderAuthButtons = () => {
    if (location.pathname === '/login') {
      return (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>New here?</span>
          <Link to="/signup" className="text-green-600 font-bold hover:underline">Create Account</Link>
        </div>
      );
    }
    if (location.pathname === '/signup') {
      return (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Have an account?</span>
          <Link to="/login" className="text-green-600 font-bold hover:underline">Log In</Link>
        </div>
      );
    }
    // Default view (e.g. Home Page before login)
    return (
      <div className="flex gap-3">
        <Link to="/login" className="px-5 py-2 rounded-full font-bold text-slate-600 hover:bg-slate-100 transition">Log In</Link>
        <Link to="/signup" className="px-5 py-2 rounded-full font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200 transition">Sign Up</Link>
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-2xl shadow-inner group-hover:rotate-12 transition-transform">🥗</div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent tracking-tight">RecipeGen</span>
        </Link>

        {/* Center Navigation - Only visible when logged in */}
        {user && (
          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50">
            {['/', '/results', '/suggested'].map(path => (
              <Link key={path} to={path} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${isActive(path) ? 'bg-white text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
                {path === '/' ? 'Home' : path === '/results' ? 'Recipes' : 'For You'}
              </Link>
            ))}
          </div>
        )}

        {/* Right Side: User Profile OR Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Saved Button */}
              <Link to="/favorites" className="relative group p-2 text-2xl hover:scale-110 transition-transform" title="Saved Recipes">
                ❤️
                {favorites.length > 0 && (
                  <span className="absolute top-0 right-0 bg-green-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown / Display */}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Welcome</p>
                  <p className="text-sm font-bold text-slate-800 leading-none">{user.username}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <button onClick={logout} className="ml-2 text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            renderAuthButtons()
          )}
        </div>

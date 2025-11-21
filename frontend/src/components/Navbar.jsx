import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { favorites, user, logout } = useContext(AppContext);

  const isActive = (path) => location.pathname === path;
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* --- 1. Logo Section --- */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-green-100 group-hover:rotate-12 transition-transform duration-300">
            🥗
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent tracking-tight">
            RecipeGen
          </span>
        </Link>

        {/* --- 2. Center Navigation (Hidden on Auth Pages) --- */}
        {!isAuthPage && user && (
          <div className="hidden md:flex items-center bg-slate-50/80 p-1.5 rounded-full border border-slate-200/60">
            {[
              { path: '/', label: 'Home' },
              { path: '/results', label: 'Recipes' },
              { path: '/suggested', label: 'For You' }
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-white text-green-600 shadow-md shadow-slate-200/50'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* --- 3. Right Side Actions --- */}
        <div className="flex items-center gap-4">

          {/* --- LinkedIn Button (ONLY on Login or Signup) --- */}
          {isAuthPage && (
            <a
              href="https://www.linkedin.com/in/ritikraj026"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
            >
              Let’s Connect ↗
            </a>
          )}

          {user ? (
            <>
              {/* Saved Button */}
              <Link
                to="/favorites"
                className={`relative group flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 
                  ${isActive('/favorites')
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-transparent border-transparent text-slate-500 hover:bg-red-50 hover:text-red-500'
                  }`}
              >
                <span className={`text-lg transition-transform duration-300 ${isActive('/favorites') ? 'scale-110' : 'group-hover:scale-125'}`}>❤️</span>
                <span className="font-bold text-sm">Saved</span>

                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* User Profile & Logout */}
              <div className="flex items-center gap-3 pl-2">
                <div className="hidden lg:block text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                  <p className="text-sm font-bold text-slate-800 leading-tight">{user.username}</p>
                </div>

                <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-slate-100">
                  {user.username.charAt(0).toUpperCase()}
                </div>

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-red-500 transition-colors ml-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            /* Auth Buttons (Visible when logged out) */
            <div className="flex items-center gap-3">
              {location.pathname !== '/login' && (
                <Link to="/login" className="px-6 py-2.5 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                  Log In
                </Link>
              )}
              {location.pathname !== '/signup' && (
                <Link to="/signup" className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5">
                  Sign Up
                </Link>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

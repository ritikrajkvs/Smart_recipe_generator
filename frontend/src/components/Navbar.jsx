import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { favorites, user, logout } = useContext(AppContext);
  const isActive = (path) => location.pathname === path;

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // Renders the main app navigation (Desktop Only)
  const renderAppNav = () => (
    <div className="hidden md:flex items-center gap-1 bg-white/50 p-1.5 rounded-full border border-white/80 backdrop-blur-sm shadow-md transition-all duration-300">
      {['/', '/results', '/suggested'].map(path => (
        <Link key={path} to={path} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${isActive(path) 
          ? 'bg-slate-800 text-white shadow-lg shadow-black/10' 
          : 'text-slate-600 hover:text-slate-800 hover:bg-white'
        }`}>
          {path === '/' ? 'Home' : path === '/results' ? 'Recipes' : 'For You'}
        </Link>
      ))}
    </div>
  );

  // Renders the user profile (Responsive)
  const renderUserProfile = () => (
    <div className="flex items-center gap-2 sm:gap-4 bg-white p-1.5 sm:p-2 rounded-full shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
      
      {/* Saved Button */}
      <Link 
        to="/favorites" 
        className={`relative group p-2 text-2xl transition-transform hover:scale-110 
          ${isActive('/favorites') ? 'text-red-600' : 'text-slate-500 hover:text-red-500'}`}
        title="Saved Recipes"
      >
        ❤️
        {favorites.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-extrabold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
            {favorites.length}
          </span>
        )}
      </Link>

      {/* Profile Info */}
      <div className="flex items-center gap-2 sm:gap-3">
        <p className="text-sm sm:text-base font-bold text-slate-800 hidden lg:block">{user.username}</p>
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-600 to-teal-500 rounded-full flex items-center justify-center text-white font-extrabold text-sm sm:text-lg shadow-md ring-2 ring-green-500/50">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <button 
          onClick={logout} 
          className="p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-50 transition-colors" 
          title="Sign Out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </button>
      </div>
    </div>
  );

  // Auth Buttons (Responsive)
  const renderAuthButtons = () => {
    return (
        <div className="flex items-center gap-2 sm:gap-3">
             {/* LinkedIn - Hidden on mobile to save space */}
            <a 
              href="https://www.linkedin.com/in/ritikrajkvs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077b5]/10 text-[#0077b5] text-sm font-bold border border-[#0077b5]/20 hover:bg-[#0077b5] hover:text-white hover:shadow-md transition-all"
            >
              <span className="font-bold">in</span>
              <span>Connect</span>
            </a>

            <div className="h-6 sm:h-8 w-px bg-slate-200 hidden sm:block"></div>

            {location.pathname === '/login' ? (
                <Link to="/signup" className="text-xs sm:text-sm font-bold text-slate-600 hover:text-green-600 transition-colors whitespace-nowrap">
                    Create Account
                </Link>
            ) : (
                <Link to="/login" className="text-xs sm:text-sm font-bold text-slate-600 hover:text-green-600 transition-colors whitespace-nowrap">
                    Log In
                </Link>
            )}
        </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center text-lg sm:text-2xl shadow-inner group-hover:rotate-12 transition-transform">🥗</div>
          <span className="text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent tracking-tight">RecipeGen</span>
        </Link>

        {/* Center Content */}
        {!isAuthPage && user && renderAppNav()}
        
        {/* Right Content */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? renderUserProfile() : renderAuthButtons()}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

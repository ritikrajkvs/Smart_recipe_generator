import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
const Navbar = ()=>{
  const location = useLocation();
  const { favorites } = useContext(AppContext);
  const isActive = (p)=> location.pathname===p ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600';
  return (<nav className="w-full bg-white shadow-md px-5 py-3 fixed top-0 left-0 z-50 flex justify-between items-center"><Link to="/" className="text-2xl font-bold text-blue-600">🍽️ RecipeGen</Link><div className="flex gap-6 text-lg"><Link to="/" className={isActive('/')}>Home</Link><Link to="/results" className={isActive('/results')}>Results</Link><Link to="/suggested" className={isActive('/suggested')}>Suggested ⭐</Link><Link to="/favorites" className={isActive('/favorites')}>Favorites ❤️ {favorites.length>0 && <span className="ml-1 bg-red-500 text-white px-2 py-0.5 rounded-full text-sm">{favorites.length}</span>}</Link></div></nav>);
};
export default Navbar;

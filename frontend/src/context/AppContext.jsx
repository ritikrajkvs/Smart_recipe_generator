import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState(JSON.parse(localStorage.getItem('ratings') || '{}'));
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // 1. Load User on Startup (Persist Session)
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/api/auth/user`, { headers: { 'x-auth-token': token } });
          setUser(res.data);
          setFavorites(res.data.favorites);
        } catch (err) {
          logout();
        }
      }
      setIsAuthLoading(false);
    };
    loadUser();
  }, [token]);
  
  useEffect(() => localStorage.setItem('ratings', JSON.stringify(ratings)), [ratings]);

  // 2. Auth Functions (FIXED: Set User Immediately)
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      
      // CRITICAL FIX: Set user data immediately so ProtectedRoute doesn't block us
      setUser(res.data.user);
      setFavorites(res.data.user.favorites);
      return true;
    } catch (e) { return false; }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, { username, email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      
      // CRITICAL FIX: Set user data immediately
      setUser(res.data.user);
      setFavorites(res.data.user.favorites);
      return true;
    } catch (e) { return false; }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setFavorites([]);
  };

  const toggleFavorite = async (recipeId) => {
    if (!user) return;
    const isFav = favorites.includes(recipeId);
    const newFavs = isFav ? favorites.filter(id => id !== recipeId) : [...favorites, recipeId];
    setFavorites(newFavs);

    try {
      await axios.put(`${API_URL}/api/auth/favorites/${recipeId}`, {}, {
        headers: { 'x-auth-token': token }
      });
    } catch (err) { console.error(err); }
  };

  return (
    <AppContext.Provider value={{ 
      ingredients, setIngredients, 
      user, login, signup, logout, isAuthLoading,
      favorites, toggleFavorite, 
      ratings, setRatings 
    }}>
      {children}
    </AppContext.Provider>
  );
};

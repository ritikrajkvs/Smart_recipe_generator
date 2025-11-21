import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState(JSON.parse(localStorage.getItem('ratings') || '{}'));
  
  // New State: prevents flickering/redirects while checking token
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // 1. Load User & Cloud Favorites on Startup
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/api/auth/user`, { headers: { 'x-auth-token': token } });
          setUser(res.data);
          setFavorites(res.data.favorites); // Load THIS user's favorites from DB
        } catch (err) {
          console.error("Auth Error:", err);
          logout(); // Invalid token? Logout.
        }
      } else {
        setUser(null);
        setFavorites([]);
      }
      setIsAuthLoading(false); // Finished checking
    };
    loadUser();
  }, [token]);

  // 2. Auth Functions
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      return true;
    } catch (e) { return false; }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, { username, email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      return true;
    } catch (e) { return false; }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setFavorites([]);
  };

  // 3. Toggle Favorite (Cloud Only)
  const toggleFavorite = async (recipeId) => {
    if (!user) return; // Should not happen in protected mode
    
    // Optimistic UI update (update screen immediately)
    const isFav = favorites.includes(recipeId);
    const newFavs = isFav ? favorites.filter(id => id !== recipeId) : [...favorites, recipeId];
    setFavorites(newFavs);

    // Sync with DB
    try {
      await axios.put(`${API_URL}/api/auth/favorites/${recipeId}`, {}, {
        headers: { 'x-auth-token': token }
      });
    } catch (err) {
      console.error(err);
      // Revert if server fails (optional safety)
    }
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

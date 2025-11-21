import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState(JSON.parse(localStorage.getItem('ratings') || '{}'));

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) {
      axios.get(`${API_URL}/api/auth/user`, { headers: { 'x-auth-token': token } })
        .then(res => {
          setUser(res.data);
          setFavorites(res.data.favorites);
        })
        .catch(() => logout());
    } else {
      setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
    }
  }, [token]);

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

  const toggleFavorite = async (recipeId) => {
    if (user) {
      try {
        const res = await axios.put(`${API_URL}/api/auth/favorites/${recipeId}`, {}, {
          headers: { 'x-auth-token': token }
        });
        setFavorites(res.data);
      } catch (err) { console.error(err); }
    } else {
      let newFavs;
      if (favorites.includes(recipeId)) {
        newFavs = favorites.filter(id => id !== recipeId);
      } else {
        newFavs = [...favorites, recipeId];
      }
      setFavorites(newFavs);
      localStorage.setItem('favorites', JSON.stringify(newFavs));
    }
  };

  return (
    <AppContext.Provider value={{ ingredients, setIngredients, user, login, signup, logout, favorites, toggleFavorite, ratings, setRatings }}>
      {children}
    </AppContext.Provider>
  );
};

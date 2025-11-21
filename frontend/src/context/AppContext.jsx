import { createContext, useState, useEffect } from 'react';
export const AppContext = createContext();
export const AppProvider = ({ children })=>{
  const [ingredients, setIngredients] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')||'[]'));
  const [ratings, setRatings] = useState(JSON.parse(localStorage.getItem('ratings')||'{}'));
  useEffect(()=> localStorage.setItem('favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(()=> localStorage.setItem('ratings', JSON.stringify(ratings)), [ratings]);
  return <AppContext.Provider value={{ingredients,setIngredients,favorites,setFavorites,ratings,setRatings}}>{children}</AppContext.Provider>;
};

import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    ingredients: [],
    favorites: [],
    ratings: JSON.parse(localStorage.getItem('ratings') || '{}'),
  },
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    setRatings: (state, action) => {
      state.ratings = action.payload;
      localStorage.setItem('ratings', JSON.stringify(action.payload));
    }
  },
});

export const { setIngredients, setFavorites, addFavorite, removeFavorite, setRatings } = recipeSlice.actions;
export default recipeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    ingredients: [],
    ratings: JSON.parse(localStorage.getItem("ratings") || "{}"),
  },
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    addRating: (state, action) => {
      const { id, rating } = action.payload;
      state.ratings[id] = rating;
      localStorage.setItem("ratings", JSON.stringify(state.ratings));
    },
  },
});

export const { setIngredients, addRating } = recipeSlice.actions;
export default recipeSlice.reducer;

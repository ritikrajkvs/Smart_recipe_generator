import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
    // Optimistic updates for favorites
    addFavoriteID: (state, action) => {
      if (state && state.favorites) {
        state.favorites.push(action.payload);
      }
    },
    removeFavoriteID: (state, action) => {
      if (state && state.favorites) {
        state.favorites = state.favorites.filter((id) => id !== action.payload);
      }
    },
  },
});

export const { addUser, removeUser, addFavoriteID, removeFavoriteID } = userSlice.actions;
export default userSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recipeReducer from "./recipeSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    recipe: recipeReducer,
  },
});

export default appStore;

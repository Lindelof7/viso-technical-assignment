import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addRecipeToFavorites: (state, action) => {
      const existingRecipe = state.find(recipe => recipe.idMeal === action.payload.idMeal);
      if (!existingRecipe) {
        state.push(action.payload);
      }
    },
    removeRecipeFromFavorites: (state, action) => {
      return state.filter(recipe => recipe.idMeal !== action.payload);
    },
  },
});

export const { addRecipeToFavorites, removeRecipeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
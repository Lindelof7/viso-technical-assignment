import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './silces';

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
    },
});
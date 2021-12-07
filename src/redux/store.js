import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/auth-slice';
import { moviesReducer } from './movie/movie-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

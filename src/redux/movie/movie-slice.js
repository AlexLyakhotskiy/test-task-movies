import { createSlice } from '@reduxjs/toolkit';

import {
  getMovies,
  addMovie,
  importMovies,
  removeMovie,
} from './movie-operations';

const initErrors = { format: '', title: '', year: '' };

const initialState = {
  items: null,
  error: null,
  loading: false,
  inputErrors: initErrors,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetAllError(state) {
      state.inputErrors = initErrors;
    },
    resetError(state, { payload }) {
      state.inputErrors = { ...state.inputErrors, [payload]: '' };
    },
  },
  extraReducers: {
    [getMovies.pending](state) {
      state.loading = true;
      state.error = null;
    },
    [getMovies.fulfilled](state, { payload }) {
      state.items = payload;
      state.loading = false;
    },
    [getMovies.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload;
    },

    [addMovie.pending](state) {
      state.loading = true;
      state.error = null;
    },
    [addMovie.fulfilled](state, { payload }) {
      state.items.push(payload);
      state.loading = false;
    },
    [addMovie.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload.code;
      state.inputErrors = payload.fields;
    },

    [importMovies.pending](state) {
      state.loading = true;
      state.error = null;
    },
    [importMovies.fulfilled](state, { payload }) {
      state.items = payload;
      state.loading = false;
    },
    [importMovies.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload;
    },

    [removeMovie.pending](state) {
      state.loading = true;
      state.error = null;
    },
    [removeMovie.fulfilled](state, { payload }) {
      state.items = state.items.filter(({ id }) => id !== payload);
      state.loading = false;
    },
    [removeMovie.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const moviesAction = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;

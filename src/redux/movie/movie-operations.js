import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetMovies,
  apiAddMovie,
  apiAddMoviesList,
  apiDeleteMovie,
} from '../../utils/apiServices';
import { setError } from './movie-actions';
import { getSearchQuery } from './movie-selectors';

export const getMovies = createAsyncThunk(
  'movies/getList',
  async (searchQuery, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await apiGetMovies(searchQuery);

      const isBadSearchRequest = !data.length && searchQuery;
      if (isBadSearchRequest) {
        dispatch(setError('Nothing match'));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addMovie = createAsyncThunk(
  'movies/add',
  async (movie, { getState, rejectWithValue }) => {
    try {
      const searchQuery = getSearchQuery(getState());
      await apiAddMovie(movie);
      const { data } = await apiGetMovies(searchQuery);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const importMovies = createAsyncThunk(
  'movies/import',
  async (movies, { getState, rejectWithValue }) => {
    try {
      const searchQuery = getSearchQuery(getState());
      await apiAddMoviesList(movies);
      const { data } = await apiGetMovies(searchQuery);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeMovie = createAsyncThunk(
  'movies/delete',
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const searchQuery = getSearchQuery(getState());
      await apiDeleteMovie(movieId);
      const { data } = await apiGetMovies(searchQuery);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

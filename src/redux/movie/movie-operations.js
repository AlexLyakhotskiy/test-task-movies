import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiGetMovies,
  apiAddMovie,
  apiAddMoviesList,
  apiDeleteMovie,
} from '../../utils/apiServices';

export const getMovies = createAsyncThunk(
  'movies/getList',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const { data } = await apiGetMovies(searchQuery);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addMovie = createAsyncThunk(
  'movies/add',
  async (movie, { rejectWithValue }) => {
    try {
      const { data } = await apiAddMovie(movie);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const importMovies = createAsyncThunk(
  'movies/import',
  async (movies, { rejectWithValue }) => {
    try {
      const { data } = await apiAddMoviesList(movies);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const removeMovie = createAsyncThunk(
  'movies/delete',
  async (movieId, { rejectWithValue }) => {
    try {
      await apiDeleteMovie(movieId);
      return movieId;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

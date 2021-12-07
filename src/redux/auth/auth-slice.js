import { createSlice } from '@reduxjs/toolkit';

import { signUp, signIn } from './auth-operations';

const initError = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
};

const initialState = {
  isLoggedIn: false,
  error: initError,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAllError(state) {
      state.error = initError;
    },
    resetError(state, { payload }) {
      state.error = { ...state.error, [payload]: '' };
    },
  },
  extraReducers: {
    [signUp.pending](state) {
      state.loading = true;
    },
    [signUp.fulfilled](state) {
      state.isLoggedIn = true;
      state.loading = false;
    },
    [signUp.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload;
    },

    [signIn.pending](state) {
      state.loading = true;
    },
    [signIn.fulfilled](state) {
      state.isLoggedIn = true;
      state.loading = false;
    },
    [signIn.rejected](state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;

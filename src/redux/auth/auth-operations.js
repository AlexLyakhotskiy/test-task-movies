import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiRegisterUser, apiLoginUser } from '../../utils/apiServices';
import { errorSerializer } from '../../utils/functions';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (user, { rejectWithValue }) => {
    try {
      const data = await apiRegisterUser(user);
      return data;
    } catch (error) {
      const newErrorWithoutDataInKeys = errorSerializer(error);
      return rejectWithValue(newErrorWithoutDataInKeys);
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (user, { rejectWithValue }) => {
    try {
      const data = await apiLoginUser(user);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

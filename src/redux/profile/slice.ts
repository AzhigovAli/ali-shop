import { Draft, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialStateType, ProfileItemsType } from './types';

export const fetchProfileItems = createAsyncThunk('profile/fetchProfileItems', async () => {
  const { data } = await axios.get('https://5f86d4f2ec72996e.mokky.dev/profile');
  return data;
});

const initialState: InitialStateType = {
  items: [],
  status: 'loading' | 'success' | 'error',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET PRODUCTS
    builder.addCase(fetchProfileItems.pending, (state: Draft<InitialStateType>) => {
      state.items = [];
      state.status = 'loading';
    }),
      builder.addCase(
        fetchProfileItems.fulfilled,
        (state: Draft<InitialStateType>, action: PayloadAction<ProfileItemsType[]>) => {
          state.items = action.payload;
          state.status = 'success';
        },
      ),
      builder.addCase(fetchProfileItems.rejected, (state: Draft<InitialStateType>) => {
        state.items = [];
        state.status = 'error';
      });
  },
});

export const profileReducer = profileSlice.reducer;

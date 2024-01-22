import { Draft, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HomeItemsType, InitialStateType } from './types';

export const fetchItems = createAsyncThunk('home/fetchItems', async () => {
  const { data } = await axios.get('https://5f86d4f2ec72996e.mokky.dev/items');
  return data;
});

const initialState: InitialStateType = {
  items: [],
  status: 'loading' | 'success' | 'error',
  searchValue: '',
};
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<HomeItemsType[]>) => {
      state.items = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GET PRODUCTS
    builder.addCase(fetchItems.pending, (state: Draft<InitialStateType>) => {
      state.items = [];
      state.status = 'loading';
    }),
      builder.addCase(
        fetchItems.fulfilled,
        (state: Draft<InitialStateType>, action: PayloadAction<HomeItemsType[]>) => {
          state.items = action.payload;
          state.status = 'success';
        },
      ),
      builder.addCase(fetchItems.rejected, (state: Draft<InitialStateType>) => {
        state.items = [];
        state.status = 'error';
      });
  },
});

export const homeReducer = homeSlice.reducer;
export const { setItems, setSearchValue } = homeSlice.actions;

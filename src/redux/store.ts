import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { homeReducer } from './home/slice';
import { cartReducer } from './cart/slice';
import { cardInfoReducer } from './cardInfo/slice';
import { profileReducer } from './profile/slice';
import { useDispatch } from 'react-redux';
import { thunk } from 'redux-thunk';

const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
    cardInfo: cardInfoReducer,
    profile: profileReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

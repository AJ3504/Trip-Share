import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import postsSlice from '../modules/postsSlice';
import userInfoSlice, { getUserProfile } from '../modules/userInfoSlice';

const store = configureStore({
  reducer: {
    postsSlice,
    userInfo: userInfoSlice
  }
});

export default store;

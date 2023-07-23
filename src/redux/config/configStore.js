import { configureStore } from '@reduxjs/toolkit';
import postsSlice from '../modules/postsSlice';
import userInfoSlice from '../modules/userInfoSlice';

const store = configureStore({
  reducer: {
    postsSlice,
    userInfo: userInfoSlice
  }
});

export default store;

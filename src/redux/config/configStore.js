import { configureStore } from '@reduxjs/toolkit';
import postsSlice from '../modules/postsSlice';
import userInfoSlice, { getUserProfile } from '../modules/userInfoSlice';
import writerInfosSlice from '../modules/writerInfosSlice';

const store = configureStore({
  reducer: {
    postsSlice,
    writerInfosSlice: writerInfosSlice,
    userInfo: userInfoSlice
  }
});

export default store;

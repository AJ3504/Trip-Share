import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import postsSlice from '../modules/postsSlice';
import userInfoSlice from '../modules/userInfoSlice';
import likeSlice from '../modules/likeSlice';

const store = configureStore({
  reducer: {
    postsSlice,
    likeSlice: likeSlice,
    userInfo: userInfoSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

export default store;

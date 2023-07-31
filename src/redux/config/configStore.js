import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import postsSlice from '../modules/postsSlice';
import userInfoSlice from '../modules/userInfoSlice';
import likeSlice from '../modules/likeSlice';
import mainPostsSlice from '../modules/mainPostsSlice';

const store = configureStore({
  reducer: {
    postsSlice: postsSlice,
    mainPostsSlice: mainPostsSlice,
    likeSlice: likeSlice,
    userInfo: userInfoSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import postsSlice from '../modules/postsSlice';
import userInfoSlice from '../modules/userInfoSlice';

const store = configureStore({
  reducer: {
    postsSlice,
    userInfo: userInfoSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

export default store;

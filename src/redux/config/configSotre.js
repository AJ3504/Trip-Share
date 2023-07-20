import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../modules/usersSlice';
import postsSlice from '../modules/postsSlice';

const store = configureStore({
  reducer: {
    usersSlice,
    postsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),

  devTools: true
});

export default store;

//커밋용

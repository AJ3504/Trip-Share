import { configureStore } from '@reduxjs/toolkit';
import usersSlice from '../modules/usersSlice';
import postsSlice from '../modules/postsSlice';

const store = configureStore({
  reducer: {
    usersSlice,
    postsSlice
  }
});

export default store;

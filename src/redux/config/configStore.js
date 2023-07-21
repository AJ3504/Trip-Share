import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import postsSlice from '../modules/postsSlice';
import logReducer from '../modules/logSlice';
import userInfoReducer from '../modules/userInfoSlice';

const store = configureStore({
  reducer: {
    postsSlice,
    log: logReducer,
    userInfo: userInfoReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

export default store;

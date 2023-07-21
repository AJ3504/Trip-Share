import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import postsSlice from '../modules/postsSlice';
import logReducer, { showUser } from '../modules/logSlice';
import userInfoReducer, { getUserProfile } from '../modules/userInfoSlice';

const store = configureStore({
  reducer: {
    postsSlice,
    log: logReducer,
    userInfo: userInfoReducer
  },
  // A non-serializable value was detected in the state, in the path 에러 해결위해 middleware 추가
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true
});

export default store;

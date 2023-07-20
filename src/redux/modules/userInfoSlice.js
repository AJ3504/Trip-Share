import { createSlice } from '@reduxjs/toolkit';

const initialStateUserInfo = { displayName: '', email: '', photoURL: '', uid: '' };

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialStateUserInfo,
  reducers: {
    getUserProfile(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

export const { getUserProfile } = userInfoSlice.actions;
export default userInfoSlice.reducer;

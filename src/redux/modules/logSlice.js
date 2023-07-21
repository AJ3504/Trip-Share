import { createSlice } from '@reduxjs/toolkit';

const initialStateLog = { isLogin: false, user: null };

const logSlice = createSlice({
  name: 'log',
  initialState: initialStateLog,
  reducers: {
    showUser(state, action) {
      return { ...state, user: action.payload };
    }
  }
});

export const { showUser } = logSlice.actions;
export default logSlice.reducer;

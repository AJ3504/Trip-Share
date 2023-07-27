import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likeAmount: 0,
  liked: false
};

const likeSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    setLikeAmount(state, action) {
      state.likeAmount = action.payload;
    },
    setLiked(state, action) {
      state.liked = action.payload;
    }
  }
});

export const { setLikeAmount, setLiked } = likeSlice.actions;
export default likeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    }
  }
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;

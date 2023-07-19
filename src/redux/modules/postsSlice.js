import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    }
  }
});

export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;

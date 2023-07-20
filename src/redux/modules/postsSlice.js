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
    },
    editPost: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          console.log(action.payload);
          return action.payload;
        } else {
          console.log(item);
          return item;
        }
      });
    },
    readPost: (state, action) => {
      console.log(action.payload);
      return action.payload;
    }
  }
});

export const { addPost, deletePost, editPost, readPost } = postsSlice.actions;
export default postsSlice.reducer;

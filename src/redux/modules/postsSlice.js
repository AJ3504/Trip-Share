import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../../service/firebase';

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState: [],
//   reducers: {
//     addPost: (state, action) => {
//       state.push(action.payload);
//     },
//     deletePost: (state, action) => {
//       return state.filter((item) => item.id !== action.payload);
//     },
//     editPost: (state, action) => {
//       return state.map((item) => {
//         if (item.id === action.payload.id) {
//           console.log(action.payload);
//           return action.payload;
//         } else {
//           console.log(item);
//           return item;
//         }
//       });
//     },
//     readPost: (state, action) => {
//       console.log(action.payload);
//       return action.payload;
//     }
//   }
// });

const initialState = {
  postsData: [],
  isLoading: false,
  isError: false,
  error: null
};

//GET
export const __getPostsSlice = createAsyncThunk('posts/getPostsSlice', async (payload, thunkAPI) => {
  try {
    const q = query(collection(db, 'posts'));
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    return thunkAPI.fulfillWithValue(posts);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//POST
export const __addPostSlice = createAsyncThunk('posts/addPostSlice', async (payload, thunkAPI) => {
  try {
    //이미지

    //게시글
    const collectionRef = collection(db, 'posts');
    const { id } = await addDoc(collectionRef, payload);
    const newPostWithId = { ...payload, id };

    return thunkAPI.fulfillWithValue(newPostWithId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//DELETE
export const __deletePostSlice = createAsyncThunk('posts/deletePostSlice', async (payload, thunkAPI) => {
  try {
    const postsRef = doc(db, 'posts', payload);
    await deleteDoc(postsRef);

    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//UPDATE
export const __updatePostSlice = createAsyncThunk('posts/updatePostSlice', async (payload, thunkAPI) => {
  try {
    const targetPostRef = doc(db, 'posts', payload.id);
    await updateDoc(targetPostRef, payload);

    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//
//Redux
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    //GET
    [__getPostsSlice.fulfilled]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.isError = false;
      state.postsData = action.payload;
    },

    [__getPostsSlice.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__getPostsSlice.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    //POST
    [__addPostSlice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.postsData.push(action.payload);
      console.log(state);
    },
    [__addPostSlice.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__addPostSlice.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    //DELETE
    [__deletePostSlice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.postsData.filter((item) => item.id !== action.payload);
    },
    [__deletePostSlice.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__deletePostSlice.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    //UPDATE
    [__updatePostSlice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.postsData.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload
          };
        } else {
          return item;
        }
      });
      // return state.postsData.map((item) => {
      //   if (item.id === action.payload.id) {
      //     return action.payload;
      //   } else {
      //     return item;
      //   }
      // });
    },
    [__updatePostSlice.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__updatePostSlice.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    }
  }
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;

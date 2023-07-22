import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../service/firebase';

const initialState = {
  postsData: [],
  profilesData: [], // profilesData를 초기 상태에 추가
  isLoading: false,
  isError: false,
  error: null
};

export const __getPostsSlice = createAsyncThunk('posts/getPostsSlice', async (payload, thunkAPI) => {
  try {
    //게시글 data
    const q = query(collection(db, 'posts'));
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });

    //프로필 data
    //'userInfo' 컬렉션 내의, 모든 문서를 쿼리
    const profileQ = query(collection(db, 'userInfo'));
    const querySnapshotObj = await getDocs(profileQ);

    // querySnapshotObj으로부터 모든 문서들의 데이터를 배열로 변환
    const profiles = querySnapshotObj.docs?.map((doc) => doc.data());

    return thunkAPI.fulfillWithValue({ posts, profiles });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __addPostSlice = createAsyncThunk('posts/addPostSlice', async (payload, thunkAPI) => {
  try {
    const { postImg, ...postData } = payload;

    if (postImg) {
      const imageRef = ref(storage, `posts/${postImg.name}`);
      await uploadBytes(imageRef, postImg);
      const downloadURL = await getDownloadURL(imageRef);
      postData.postImg = downloadURL;
    }

    const collectionRef = collection(db, 'posts');
    const { id } = await addDoc(collectionRef, postData);
    const newPostWithId = { ...postData, id };

    return thunkAPI.fulfillWithValue(newPostWithId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deletePostSlice = createAsyncThunk('posts/deletePostSlice', async (payload, thunkAPI) => {
  try {
    const postsRef = doc(db, 'posts', payload);
    await deleteDoc(postsRef);

    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __updatePostSlice = createAsyncThunk('posts/updatePostSlice', async (payload, thunkAPI) => {
  try {
    const targetPostRef = doc(db, 'posts', payload.id);
    await updateDoc(targetPostRef, payload);

    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [__getPostsSlice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.postsData = action.payload.posts; //.posts 추가
      state.profilesData = action.payload.profiles; // profilesData를 업데이트
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

    [__addPostSlice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.postsData.push(action.payload);
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

    [__deletePostSlice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.postsData = state.postsData.filter((item) => item.id !== action.payload);
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

    [__updatePostSlice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;

      state.postsData = state.postsData.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
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

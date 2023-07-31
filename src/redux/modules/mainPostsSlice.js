import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../service/firebase';

const initialState = {
  postsData: [],
  isLoading: false,
  isError: false,
  error: null
};

export const __getMainPostsSlice = createAsyncThunk('posts/getPostsSlice', async (payload, thunkAPI) => {
  try {
    // 1. postsData
    const postsData = [];

    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(3));
    const querySnapshot = await getDocs(q);

    // 프로필 data
    const profileQ = query(collection(db, 'userInfo'));
    const profileQuerySnapshot = await getDocs(profileQ);

    const profileMap = {};

    profileQuerySnapshot.forEach((doc) => {
      const profile = doc.data();
      profileMap[profile.uid] = {
        nickname: profile.nickname,
        photoURL: profile.photoURL
      };
    });

    querySnapshot.forEach((doc) => {
      //
      const post = {
        id: doc.id,
        ...doc.data(),
        writerNickname: profileMap[doc.data().uid]?.nickname || '',
        writerPhotoURL: profileMap[doc.data().uid]?.photoURL || ''
      };

      postsData.push(post);
    });

    // 2. likesData
    const likeQ = query(collection(db, 'likes'));
    const likeQuerySnapshot = await getDocs(likeQ);

    const likeMap = {};
    const likesData = [];

    likeQuerySnapshot.forEach((doc) => {
      // likeMap[likeTargetPostId] 객체 생성
      const like = doc.data();
      const likeTargetPostId = doc.data().targetPostId;
      likeMap[likeTargetPostId] = {
        targetPostId: like.targetPostId,
        userId: like.userId
      };

      //  각각의 객체들을 얕은복사하여 likesData 배열에 추가
      likesData.push({ ...likeMap[likeTargetPostId] });
    });

    return thunkAPI.fulfillWithValue({ postsData, likesData });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const mainPostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [__getMainPostsSlice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.postsData = action.payload.postsData;
      state.likesData = action.payload.likesData;
    },

    [__getMainPostsSlice.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__getMainPostsSlice.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    }
  }
});

export const {} = mainPostsSlice.actions;
export default mainPostsSlice.reducer;

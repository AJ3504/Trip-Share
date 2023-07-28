import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../service/firebase';

const initialState = {
  postsData: [],
  isLoading: false,
  isError: false,
  error: null
};

export const __getPostsSlice = createAsyncThunk('posts/getPostsSlice', async (payload, thunkAPI) => {
  try {
    const postsData = [];

    // 게시글 data
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q); // [{1}, {2}, {3}]

    // 1.프로필 data
    const profileQ = query(collection(db, 'userInfo'));
    const profileQuerySnapshot = await getDocs(profileQ); // [{1}, {2}, {3}]

    // 프로필 data를 담을 객체
    const profileMap = {};

    profileQuerySnapshot.forEach((doc) => {
      const profile = doc.data(); // 여기서 profile.uid를 뽑아냄
      profileMap[profile.uid] = {
        // 객체[프로퍼티] === 객체.프로퍼티  // profile.uid를 키로 사용하여 사용자의 닉네임과 프로필 사진 URL을 profileMap에 저장
        nickname: profile.nickname,
        photoURL: profile.photoURL
      };
    });

    // 2.좋아요 data
    const likeQ = query(collection(db, 'likes'));
    const likeQuerySnapshot = await getDocs(likeQ); // [{1}, {2}, {3}]

    // 좋아요 data를 담을 객체
    const likeMap = {};
    const likesData = [];

    likeQuerySnapshot.forEach((doc) => {
      // 1. likeMap[likeTargetPostId] 객체 생성
      const like = doc.data();
      const likeTargetPostId = doc.data().targetPostId; // 아예 likes 속 targetPostId속성을 key로 씀
      likeMap[likeTargetPostId] = {
        targetPostId: like.targetPostId,
        userId: like.userId
      };

      // 2. 각각의 객체들을 얕은복사하여 likesData 배열에 추가
      likesData.push({ ...likeMap[likeTargetPostId] });
    });
    console.log('좋아요', likesData);

    // 0, 1, 2 합치기
    querySnapshot.forEach((doc) => {
      //
      const post = {
        id: doc.id,
        ...doc.data(),
        writerNickname: profileMap[doc.data().uid]?.nickname || '', // 해당 문서 속, nickname 프로퍼티에 해당하는 값이 없으면 빈 문자열('')울 가져옴
        writerPhotoURL: profileMap[doc.data().uid]?.photoURL || ''
        // targetPostId: likeMap[doc.id]?.targetPostId || null, // 그래야 얘랑 싱크를 맞출 수 있음
        // userId: likeMap[doc.id]?.userId || null
      };

      postsData.push(post);
    });
    console.log('포스트', postsData);

    return thunkAPI.fulfillWithValue({ postsData, likesData });
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
      state.postsData = action.payload.postsData;
      state.likesData = action.payload.likesData;
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

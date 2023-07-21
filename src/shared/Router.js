import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import MyPage from '../pages/MyPage';
import Layout from './Layout';
import { getUserProfile } from '../redux/modules/userInfoSlice';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../service/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, 'userInfo', user.uid);
          const docSnap = await getDoc(docRef);
          dispatch(getUserProfile({ ...docSnap.data(), uid: user.uid }));
        }
      });
    };
    getProfile();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:postId" element={<Detail />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

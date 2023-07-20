import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import MyPage from '../pages/MyPage';
import Layout from './Layout';

const Router = () => {
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

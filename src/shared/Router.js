import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Post from '../pages/Post';
import Detail from '../pages/Detail';
import MyPage from '../pages/MyPage';
import GlobalStyle from '../GlobalStyle';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/post" element={<Post />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/:id" element={<MyPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;

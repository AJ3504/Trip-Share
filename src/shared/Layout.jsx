import React from 'react';
import Header from '../components/common/Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;

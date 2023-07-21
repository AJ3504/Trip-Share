import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        <div>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;

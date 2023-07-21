import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { styled } from 'styled-components';

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <Body>{children}</Body>

      <Footer />
    </>
  );
};

export default Layout;

export const Body = styled.div`
  min-height: calc(100vh);
  padding-top: 90px;
`;

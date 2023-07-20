import React from 'react';
import UserInfo from '../components/authentication/UserInfo';
import GoogleMaps from '../components/map/GoogleMaps';
import NaverImageSearch from '../components/map/NaverSearch';

const MyPage = () => {
  return (
    <>
      <UserInfo />
      <NaverImageSearch />
      {/* <GoogleMaps /> */}
    </>
  );
};

export default MyPage;

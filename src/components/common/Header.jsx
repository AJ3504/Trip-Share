import React, { useEffect, useState } from 'react';
import SingUp from '../authentication/SignUp';
import SignIn from '../authentication/SignIn';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../service/firebase';
import { useSelector } from 'react-redux';
import UserInfoModal from '../authentication/UserInfoModal';

const Header = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user?.email);
    });
  }, []);

  const handleLoginClick = () => {
    setCurrentUser(false);
  };

  const handleSignUpClick = () => {
    setCurrentUser(false);
  };

  const handleLogoutClick = async () => {
    alert('로그아웃 하시겠습니까?');
    await signOut(auth);
    navigate('/');
  };

  const getProfile = useSelector((state) => state.userInfo);

  return (
    <>
      <St.Header>
        <St.MenuWrapper>
          {currentUser ? (
            <>
              <St.Img
                id="PROFILE IMG"
                src={
                  getProfile.photoURL
                    ? getProfile.photoURL
                    : 'https://freevector-images.s3.amazonaws.com/uploads/vector/preview/41311/FreeVectorWorld_Tourism_Day_Backgroundyc0622_generated.jpg'
                }
                onClick={() => {
                  navigate('/mypage');
                }}
              />
              <UserInfoModal />
              <St.HeaderMenu2 onClick={handleLogoutClick}>로그아웃</St.HeaderMenu2>
            </>
          ) : (
            <>
              <St.HeaderMenu onClick={handleLoginClick}>
                <SignIn />
              </St.HeaderMenu>
              <St.HeaderMenu onClick={handleSignUpClick}>
                <SingUp />
              </St.HeaderMenu>
            </>
          )}
        </St.MenuWrapper>
        <St.LogoWrapper>
          <St.Logo
            onClick={() => {
              navigate('/');
            }}
          >
            TripShare
          </St.Logo>
        </St.LogoWrapper>
      </St.Header>
    </>
  );
};

export default Header;

const St = {
  Header: styled.header`
    width: 100vw;
    height: 70px;
    background-color: beige;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
  `,
  LogoWrapper: styled.div`
    flex: 1;
    text-align: center;
  `,
  Logo: styled.div`
    cursor: pointer;
    font-weight: 600;
    font-size: 25px;
  `,
  MenuWrapper: styled.div`
    display: flex;
  `,
  HeaderMenu: styled.div`
    cursor: pointer;
  `,
  HeaderMenu2: styled.div`
    cursor: pointer;
    padding: 1px 6px;
    font-size: 0.8333rem;
    display: flex;
    align-items: center;
    margin-left: 5px;
  `,
  Img: styled.img`
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    cursor: pointer;
  `
};

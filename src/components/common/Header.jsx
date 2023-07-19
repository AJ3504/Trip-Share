import React, { useEffect, useState } from 'react';
import SingUp from '../authentication/SignUp';
import SignIn from '../authentication/SignIn';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../service/firebase';

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

  const handleProfileClick = () => {
    navigate('/mypage');
  };

  const handleLogoutClick = async () => {
    alert('로그아웃 하시겠습니까?');
    await signOut(auth);
    navigate('/');
  };

  return (
    <>
      <St.Header>
        <St.LogoWrapper>
          <St.Logo
            onClick={() => {
              navigate('/');
            }}
          >
            TripShare
          </St.Logo>
        </St.LogoWrapper>
        <St.MenuWrapper>
          {currentUser ? (
            <>
              <St.HeaderMenu onClick={handleProfileClick}>프로필</St.HeaderMenu>
              <St.HeaderMenu onClick={handleLogoutClick}>로그아웃</St.HeaderMenu>
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
      </St.Header>
    </>
  );
};

export default Header;

const St = {
  Header: styled.header`
    width: 100wh;
    height: 70px;
    background-color: beige;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  `,
  LogoWrapper: styled.div`
    flex: 1;
    text-align: center;
  `,
  Logo: styled.div`
    cursor: pointer;
  `,
  MenuWrapper: styled.div`
    display: flex;
  `,
  HeaderMenu: styled.div`
    cursor: pointer;
    margin-left: 15px;
  `
};

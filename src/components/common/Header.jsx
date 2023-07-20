import React, { useEffect, useState } from 'react';
import SingUp from '../authentication/SignUp';
import SignIn from '../authentication/SignIn';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../service/firebase';
import { useSelector } from 'react-redux';
import UserInfoModal from '../authentication/UserInfoModal';
import { St } from './HeaderStyle';

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

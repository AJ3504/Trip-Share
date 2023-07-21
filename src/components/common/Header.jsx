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
  const { nickname } = getProfile;

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
                    : 'https://us.123rf.com/450wm/yupiramos/yupiramos1707/yupiramos170727142/83106510-%EC%97%AC%ED%96%89-%EA%B0%80%EB%B0%A9-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%97%AC%ED%96%89.jpg'
                }
                onClick={() => {
                  navigate('/mypage');
                }}
              />

              <St.Nickname
                onClick={() => {
                  navigate('/mypage');
                }}
              >
                {nickname}
              </St.Nickname>
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
            <img src="/Logo.png" alt="TripShare Logo" style={{ width: '300px', height: '200px', marginTop: '30px' }} />
          </St.Logo>
        </St.LogoWrapper>
      </St.Header>
    </>
  );
};

export default Header;

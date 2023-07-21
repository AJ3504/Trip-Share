import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../service/firebase';
import SingUp from '../authentication/SignUp';
import SignIn from '../authentication/SignIn';
import { ref } from 'firebase/storage';
import { St } from './HeaderStyle';
import ArrowIcon from './ArrowIcon';

const Header = () => {
  const getProfile = useSelector((state) => state.userInfo);
  const { nickname } = getProfile;
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const openDropdwon = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdwon = () => {
    setIsDropdownOpen(false);
  };

  const clickOutside = (e) => {
    if (!['마이페이지', '로그아웃'].includes(e.target.innerText)) {
      closeDropdwon();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

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
    await signOut(auth);
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <St.Header>
        <St.MenuWrapper>
          {currentUser ? (
            <>
              <St.ProfileImg
                src={
                  getProfile.photoURL
                    ? getProfile.photoURL
                    : 'https://us.123rf.com/450wm/yupiramos/yupiramos1707/yupiramos170727142/83106510-%EC%97%AC%ED%96%89-%EA%B0%80%EB%B0%A9-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%97%AC%ED%96%89.jpg'
                }
                onClick={() => {
                  navigate('/mypage');
                }}
              />

              <St.Nickname onClick={openDropdwon}>
                {nickname}
                <ArrowIcon isOpen={openDropdwon} />
              </St.Nickname>
              {isDropdownOpen ? (
                <St.Dropdown ref={dropdownRef}>
                  <St.DropdownItem
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/mypage');
                    }}
                  >
                    마이페이지
                  </St.DropdownItem>
                  <St.DropdownLine />
                  <St.DropdownItem onClick={handleLogoutClick}>로그아웃</St.DropdownItem>
                </St.Dropdown>
              ) : null}
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
          <div
            onClick={() => {
              navigate('/');
            }}
          >
            <St.LogoImg src="/Logo.png" alt="TripShare Logo" />
          </div>
        </St.LogoWrapper>
      </St.Header>
    </>
  );
};

export default Header;

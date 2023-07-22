import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../service/firebase';
import SingUp from '../authentication/SignUp';
import SignIn from '../authentication/SignIn';
import { St } from './HeaderStyle';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';

const Header = () => {
  const getProfile = useSelector((state) => state.userInfo);
  const { nickname } = getProfile;
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // 드롭다운 바깥영역 클릭 시 드롭다운 닫기
  const clickOutside = (e) => {
    if (!['마이페이지', '로그아웃'].includes(e.target.innerText)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  // 현재 사용자의 로그인 상태를 확인하고 저장
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
              />
              <St.Nickname
                onClick={() => {
                  navigate('/mypage');
                }}
              >
                {nickname}
              </St.Nickname>
              <St.ArrowIcons onClick={openDropdown}>
                {isDropdownOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
              </St.ArrowIcons>
              {isDropdownOpen ? (
                <St.Dropdown>
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

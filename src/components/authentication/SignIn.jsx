import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { auth } from '../../service/firebase';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const SignIn = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user?.email);
    });
  }, []);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 된 유저 정보', userCredential);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate('/');
      setUserData(result.user);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider(); // provider 깃허브 설정

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate('/');
      setUserData(result.user);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const clickOutside = (e) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <div>
      <St.Btn onClick={openModal}>로그인</St.Btn>
      {isOpen && (
        <St.ModalBox ref={modalRef}>
          <St.ModalContents>
            <div>
              <h3>LOGIN</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <St.Input
                  placeholder="이메일 주소를 입력해주세요"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <St.Input
                  placeholder="비밀번호를 입력해주세요"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button type="submit" onClick={handleEmailSignIn}>
                  로그인
                </button>
              </form>
              <div>
                <button onClick={handleGoogleSignIn}>Google</button>
                <button onClick={handleGithubSignIn}>Github</button>
              </div>
            </div>
          </St.ModalContents>
        </St.ModalBox>
      )}
    </div>
  );
};

export default SignIn;

const St = {
  ModalBox: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  `,

  ModalContents: styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
  `,

  Input: styled.input`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  Btn: styled.button`
    border: none;
    cursor: pointer;
    background-color: transparent;
  `
};

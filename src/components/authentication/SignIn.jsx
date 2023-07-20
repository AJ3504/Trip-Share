import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from '../../service/firebase';
import { useNavigate } from 'react-router-dom';
import { ERR_CODE } from '../../error';
import { St } from './SignInStyle';
import { collection, doc, setDoc } from 'firebase/firestore';

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
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(ERR_CODE[errorCode]);
      console.log('error', errorCode, errorMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const collectionRef = collection(db, 'userInfo');
      await setDoc(doc(collectionRef, user.uid), {
        nickname: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL:
          'https://us.123rf.com/450wm/yupiramos/yupiramos1707/yupiramos170727142/83106510-%EC%97%AC%ED%96%89-%EA%B0%80%EB%B0%A9-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%97%AC%ED%96%89.jpg'
      });

      navigate('/');
      setUserData(result.user);
      console.log('로그인 된 유저', user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(ERR_CODE[errorCode]);
      console.log('error', errorCode, errorMessage);
    }
  };

  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider(); // provider 깃허브 설정

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const collectionRef = collection(db, 'userInfo');
      await setDoc(doc(collectionRef, user.uid), {
        nickname: Math.floor(Math.random() * 1000),
        email: user.email,
        uid: user.uid,
        photoURL:
          'https://us.123rf.com/450wm/yupiramos/yupiramos1707/yupiramos170727142/83106510-%EC%97%AC%ED%96%89-%EA%B0%80%EB%B0%A9-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%97%AC%ED%96%89.jpg'
      });

      navigate('/');
      setUserData(result.user);
      console.log('로그인 된 유저', user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(ERR_CODE[errorCode]);
      console.log('error', errorCode, errorMessage);
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
            <St.LoginWrap>
              <St.Login>LOGIN</St.Login>
              <form onSubmit={handleEmailSignIn}>
                <St.LoginTitle>이메일</St.LoginTitle>
                <St.Input
                  type="email"
                  placeholder="이메일 주소를 입력해주세요"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <St.LoginTitle>비밀번호</St.LoginTitle>
                <St.Input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <St.LoginBtn type="submit">로그인</St.LoginBtn>
              </form>
              <St.SocialLoginWarp>
                <St.SocialLoginBtn onClick={handleGoogleSignIn}>Google</St.SocialLoginBtn>
                <St.SocialLoginBtn onClick={handleGithubSignIn}>Github</St.SocialLoginBtn>
              </St.SocialLoginWarp>
            </St.LoginWrap>
          </St.ModalContents>
        </St.ModalBox>
      )}
    </div>
  );
};

export default SignIn;

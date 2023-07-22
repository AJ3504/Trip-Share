import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../service/firebase';
import { ERR_CODE } from '../../error';
import { St } from './SignInStyle';
import { FcGoogle } from 'react-icons/fc';
import { DiGithubAlt } from 'react-icons/di';

const SignIn = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  // 컴포넌트가 처음 마운트될 때 firebase 인증 상태를 확인하고 현재 사용자의 이메일을 업데이트
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user?.email);
    });
  }, []);

  // 이메일 로그인
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('로그인 된 유저 정보', userCredential);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(ERR_CODE[errorCode]);
      console.error('error', errorCode, errorMessage);
    }
  };

  // 구글 소셜 로그인
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, 'userInfo', user.uid);
      const docSnap = await getDoc(docRef);
      // firestore에 사용자 정보가 없는 경우에만 정보 추가
      if (!docSnap.data()) {
        const collectionRef = collection(db, 'userInfo');
        await setDoc(doc(collectionRef, user.uid), {
          nickname: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL:
            'https://us.123rf.com/450wm/yupiramos/yupiramos1707/yupiramos170727142/83106510-%EC%97%AC%ED%96%89-%EA%B0%80%EB%B0%A9-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%97%AC%ED%96%89.jpg'
        });
      }
      // 로그인 성공 시 메인으로 이동 + 사용자 정보 State에 저장
      navigate('/');
      setUserData(result.user);
      console.log('로그인 된 유저', user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(ERR_CODE[errorCode]);
      console.error('error', errorCode, errorMessage);
    }
  };

  // 깃허브 소셜 로그인
  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, 'userInfo', user.uid);
      const docSnap = await getDoc(docRef);
      // firestore에 사용자 정보가 없는 경우에만 정보 추가
      if (!docSnap.data()) {
        const collectionRef = collection(db, 'userInfo');
        await setDoc(doc(collectionRef, user.uid), {
          // ~1000 랜덤 정수
          nickname: Math.floor(Math.random() * 1000),
          email: user.email,
          uid: user.uid,
          photoURL:
            'https://us.123rf.com/450wm/yupiramos/yupiramos1707/yupiramos170727142/83106510-%EC%97%AC%ED%96%89-%EA%B0%80%EB%B0%A9-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%97%AC%ED%96%89.jpg'
        });
      }
      // 로그인 성공 시 메인으로 이동 + 사용자 정보 State에 저장
      navigate('/');
      setUserData(result.user);
      console.log('로그인 된 유저', user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(ERR_CODE[errorCode]);
      console.error('error', errorCode, errorMessage);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 모달 바깥영역 클릭 시 모달 닫기
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
                <St.SocialLoginBtn onClick={handleGoogleSignIn}>
                  <FcGoogle size="20" />
                </St.SocialLoginBtn>
                <St.SocialLoginBtn onClick={handleGithubSignIn}>
                  <DiGithubAlt size="25" />
                </St.SocialLoginBtn>
              </St.SocialLoginWarp>
            </St.LoginWrap>
          </St.ModalContents>
        </St.ModalBox>
      )}
    </div>
  );
};

export default SignIn;

import React, { useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../service/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ERR_CODE } from '../../error';
// import { St } from './SignUpStyle';

const SingUp = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();
  const navigate = useNavigate();

  const handleEmailSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { nickname: nickname });
      console.log('가입된 유저 정보', userCredential);

      const collectionRef = collection(db, 'userInfo');
      await setDoc(doc(collectionRef, userCredential.user.uid), {
        nickname: nickname,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        photoURL:
          'https://us.123rf.com/450wm/yupiramos/yupiramos1707/yupiramos170727142/83106510-%EC%97%AC%ED%96%89-%EA%B0%80%EB%B0%A9-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%97%AC%ED%96%89.jpg'
      });

      alert('회원가입 완료');
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(ERR_CODE[errorCode]);
      console.log('error', errorCode, errorMessage);
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    if (nickname && email && password && checkPassword && password === checkPassword) {
      await handleEmailSignUp();
    } else if (nickname && email && password && checkPassword && password !== checkPassword) {
      alert('입력하신 비밀번호가 다릅니다.');
    } else alert('모든 항목을 입력해주세요!');
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
      <St.Btn onClick={openModal}>회원가입</St.Btn>
      {isOpen && (
        <St.ModalBox ref={modalRef}>
          <St.ModalContents>
            <div>
              <h3>SIGN UP</h3>
              <form onSubmit={handleSubmitSignUp}>
                <St.Input
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
                <St.Input
                  type="email"
                  placeholder="이메일 주소를 입력해주세요"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <St.Input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <St.Input
                  type="password"
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  onChange={(e) => {
                    setCheckPassword(e.target.value);
                  }}
                />
                <button type="submit">회원가입</button>
              </form>
            </div>
          </St.ModalContents>
        </St.ModalBox>
      )}
    </div>
  );
};
export default SingUp;

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

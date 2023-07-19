import React, { useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../service/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

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
      console.log('가입된 유저 정보', userCredential);

      const collectionRef = collection(db, 'userinfo');
      await setDoc(doc(collectionRef, userCredential.user.uid), {
        nickname: nickname,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        photoURL:
          'https://freevector-images.s3.amazonaws.com/uploads/vector/preview/41311/FreeVectorWorld_Tourism_Day_Backgroundyc0622_generated.jpg'
      });

      alert('회원가입 완료');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    if (nickname && email && password && checkPassword && password === checkPassword) {
      await handleEmailSignUp();
    } else if (nickname && email && password && checkPassword && password !== checkPassword) {
      alert('입력하신 비밀번호가 다릅니다.');
    } else alert('모든 내용을 입력해주세요!');
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
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  onChange={(e) => {
                    setCheckPassword(e.target.value);
                  }}
                />
                <button type="submit" onClick={handleEmailSignUp}>
                  회원가입
                </button>
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

import React, { useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../service/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ERR_CODE } from '../../error';
import { St } from './SignUpStyle';

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
      // 사용자의 닉네임을 Firebase Auth에 업데이트
      await updateProfile(auth.currentUser, { nickname: nickname });

      // Firestore userInfo 컬렉션에 사용자 정보 저장
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
    }
  };
  // 회원가입 폼 & 유효성 검사
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    if (nickname && email && password && checkPassword && password === checkPassword) {
      await handleEmailSignUp();
    } else if (nickname && email && password && checkPassword && password !== checkPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    } else alert('필수 값을 모두 입력해주세요!');
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
      <St.Btn onClick={openModal}>회원가입</St.Btn>
      {isOpen && (
        <St.ModalBox ref={modalRef}>
          <St.ModalContents>
            <St.SignUPWrap>
              <St.SignUp>SIGN UP</St.SignUp>
              <form onSubmit={handleSubmitSignUp}>
                <St.SignUpTitle>닉네임*</St.SignUpTitle>
                <St.Input
                  type="text"
                  maxLength={6}
                  placeholder="닉네임은 6자리까지만 입력해주세요"
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
                <St.SignUpTitle>이메일*</St.SignUpTitle>
                <St.Input
                  type="email"
                  placeholder="올바른 이메일 주소를 입력해주세요"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <St.SignUpTitle>비밀번호*</St.SignUpTitle>
                <St.Input
                  type="password"
                  placeholder="비밀번호는 6자리 이상 입력해주세요"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <St.SignUpTitle>비밀번호 재확인*</St.SignUpTitle>
                <St.Input
                  type="password"
                  placeholder="비밀번호를 다시 한 번 입력해주세요"
                  onChange={(e) => {
                    setCheckPassword(e.target.value);
                  }}
                />
                <St.SignUpBtn type="submit">회원가입</St.SignUpBtn>
              </form>
            </St.SignUPWrap>
          </St.ModalContents>
        </St.ModalBox>
      )}
    </div>
  );
};
export default SingUp;

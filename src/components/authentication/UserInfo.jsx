import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../../service/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getUserProfile } from '../../redux/modules/userInfoSlice';
import { styled } from 'styled-components';
import UserInfoModal from './UserInfoModal';

const UserInfo = () => {
  const dispatch = useDispatch();

  // 초기 회원가입 후 로그인 시 렌더링 시점이 로그인 전이기에 데이터가 스토어에 저장되지 않아 프로필 접속 시 스토어로 데이터가 전달될 수 있도록 구현
  const firebaseGetProfile = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'userInfo', user.uid);
        const docSnap = await getDoc(docRef);
        dispatch(getUserProfile({ ...docSnap.data(), uid: user.uid }));
      }
    });
  };
  // 함수가 한 번만 실행되도록 useEffect내 선언
  useEffect(() => {
    firebaseGetProfile();
  }, []);

  const getProfile = useSelector((state) => state.userInfo);

  const { uid } = getProfile;

  const [currentPhotoURL, setCurrentPhotoURL] = useState(null);
  const [currentNickname, setCurrentNickname] = useState(null);

  useEffect(() => {
    setCurrentPhotoURL(getProfile.photoURL);
  }, [getProfile.photoURL]);

  useEffect(() => {
    setCurrentNickname(getProfile.nickname);
  }, [getProfile.nickname]);

  return (
    <>
      <div key={uid}>
        <St.ProfileContainer>
          <St.ProfileWarp>
            <UserInfoModal />
            <St.ProfileImageBox>
              <St.ProfileImage src={currentPhotoURL} alt="userInfo" />
            </St.ProfileImageBox>
            <p>{currentNickname}</p>
          </St.ProfileWarp>
        </St.ProfileContainer>
      </div>
    </>
  );
};

export default UserInfo;

export const St = {
  ProfileContainer: styled.div`
    position: relative;
    outline: 2px solid black;
    width: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  ProfileWarp: styled.div`
    margin: 0 auto;
  `,

  ProfileImageBox: styled.div`
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 100%;
  `,

  ProfileImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `
};

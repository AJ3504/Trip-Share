import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { IoMdSettings } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db, storage } from '../../service/firebase';
import { getUserProfile } from '../../redux/modules/userInfoSlice';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const UserInfoModal = () => {
  const dispatch = useDispatch();
  const getProfile = useSelector((state) => state.userInfo);

  const { uid } = getProfile;

  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPhotoURL, setCurrentPhotoURL] = useState(null);
  const [currentNickname, setCurrentNickname] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

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

  useEffect(() => {
    setCurrentPhotoURL(getProfile.photoURL);
  }, [getProfile.photoURL]);

  useEffect(() => {
    setCurrentNickname(getProfile.nickname);
  }, [getProfile.nickname]);

  // useRef를 이용하여 input태그에 접근
  const imageFileInput = useRef();

  // 이미지 업로드 버튼 클릭 시 이미지 파일 인풋 태그에 클릭 이벤트 걸기
  const onClickImageFile = () => {
    imageFileInput.current.click();
  };

  const nicknameChangeHandler = (e) => {
    setCurrentNickname(e.target.value);
  };

  const profileUpdateHandler = (e) => {
    e.preventDefault();
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    if (!currentNickname) return alert('닉네임을 입력해주세요');
    const q = query(
      collection(db, 'userInfo'),
      where('nickname', '==', currentNickname),
      where('email', '!=', getProfile.email)
    );
    const result = await getDocs(q);
    const findData = result.docs[0]?.data();

    if (findData) return alert('이미 사용중인 닉네임 입니다.');

    const userDocRef = doc(db, 'userInfo', uid);
    await updateDoc(userDocRef, { nickname: currentNickname });

    alert('닉네임 수정 완료');

    const updateProfileData = { ...getProfile, nickname: currentNickname };
    dispatch(getUserProfile(updateProfileData));
  };

  const changedPhoto = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    try {
      const URL = `${uid}/${file.name}`;
      const storageRef = ref(storage, URL);
      await uploadBytes(storageRef, file);
      const resultPhotoURL = await getDownloadURL(storageRef);
      setCurrentPhotoURL(resultPhotoURL);
      const userDocRef = doc(db, 'userInfo', uid);
      await updateDoc(userDocRef, { photoURL: resultPhotoURL });
      alert('프로필 사진 변경 완료');

      const updateProfileData = { ...getProfile, photoURL: resultPhotoURL };

      dispatch(getUserProfile(updateProfileData));
    } catch (error) {
      console.error(error);
      alert('프로필 사진 변경 실패', error);
    }
  };

  return (
    <div>
      <IoMdSettings onClick={openModal} />
      {isOpen && (
        <St.ModalBox ref={modalRef}>
          <St.ModalContents>
            <div key={uid}>
              <St.ProfileContainer>
                <St.ProfileImageWrap>
                  <St.ProfileImageBox>
                    <St.ProfileImage src={currentPhotoURL} alt="userInfo" />
                  </St.ProfileImageBox>
                  <St.ImageUploadBox>
                    <St.ImageInput type="file" ref={imageFileInput} onChange={changedPhoto} />
                    <button onClick={onClickImageFile}>프로필 사진 변경</button>
                  </St.ImageUploadBox>
                </St.ProfileImageWrap>

                <form onSubmit={profileUpdateHandler}>
                  <div>
                    <p>EMAIL</p>
                    <input type="email" placeholder={getProfile.email} disabled={true} />

                    <p>NICKNAME</p>
                    <input type="text" maxLength={10} value={currentNickname} onChange={nicknameChangeHandler} />
                    <button type="submit" onClick={updateProfile}>
                      닉네임 변경
                    </button>
                  </div>
                </form>
              </St.ProfileContainer>
            </div>
          </St.ModalContents>
        </St.ModalBox>
      )}
    </div>
  );
};

export default UserInfoModal;

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
  `,

  ModalContents: styled.div`
    background-color: #fff;
    width: 600px;
    padding: 20px;
    border-radius: 12px;
  `,

  Btn: styled.button`
    border: none;
    cursor: pointer;
    border-radius: 8px;
    background-color: #fab1a0;
    height: 40px;
    width: 120px;
  `,

  ProfileContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
  `,

  ProfileImageWrap: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ProfileImageBox: styled.div`
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 100%;
    margin: 30px;
  `,

  ProfileImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,

  ImageUploadBox: styled.div`
    margin-bottom: 15px;
  `,

  ImageInput: styled.input`
    display: none;
  `,

  ProfileBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  MemberInput: styled.input`
    width: 300px;
    height: 30px;
    padding-left: 15px;
    border: 0.03rem solid gray;
    border-radius: 5px;
    background-color: transparent;
    outline: none;
  `,
  MemberTextarea: styled.textarea`
    width: 296px;
    height: 40px;
    padding: 10px;
    border: 0.03rem solid gray;
    border-radius: 5px;
    background-color: transparent;
    outline: none;
  `,

  Contents: styled.div`
    display: flex;
    gap: 30px;
    margin: 10px;
  `,

  ContentsTitle: styled.button`
    cursor: pointer;
    margin-left: 15px;
    margin-bottom: 5px;
    border: none;
    background-color: transparent;
    font-size: 15px;
  `,

  contentsBody: styled.div`
    border-radius: 5px;
    margin-top: 15px;
    width: 100%;
    height: 100%;
  `,

  Btns: styled.button`
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background-color: #e4dccf;
  `
};

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../../service/firebase';
import { __addPostSlice } from '../../redux/modules/postsSlice';
import { styled } from 'styled-components';
import { Button } from '../map/KakaoMap-Styled';

const PostWrite = ({ marker, setIsModal }) => {
  const options = ['관광', '식당', '카페', '숙소'];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [option, setOption] = useState('');

  const handelOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setOption(option);
  };

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postImg, setPostImg] = useState(null);

  const onChangePost = (e) => {
    const {
      target: { name, value }
    } = e;
    if (name === 'title') {
      setPostTitle(value);
    }
    if (name === 'body') {
      setPostBody(value);
    }
  };

  const imgSelect = (e) => {
    setPostImg(e.target.files[0]);
  };

  const dispatch = useDispatch();

  const onSubmitNewPost = async (e) => {
    e.preventDefault();

    if (postTitle.trim() === '' || postBody.trim() === '') {
      alert('제목과 내용을 입력해주세요');
      return;
    }

    if (postImg != null) {
      const imageRef = ref(storage, `${auth.currentUser.uid}/${postImg.name}`);
      await uploadBytes(imageRef, postImg);
      const downloadURL = await getDownloadURL(imageRef);
      setPostImg(downloadURL);
    }

    const newPost = {
      uid: auth.currentUser.uid,
      markerId: marker.id,
      markerPosition: marker.position,
      postTitle: postTitle,
      postBody: postBody,
      postImg: postImg,
      category: option
    };

    dispatch(__addPostSlice(newPost));

    setPostTitle('');
    setPostBody('');
    setIsModal(false);
  };

  return (
    <>
      <StModalBox>
        <StModalContents>
          <CloseButton
            onClick={() => {
              setIsModal(false);
            }}
          >
            ❌
          </CloseButton>
          <h3 style={{ textAlign: 'center', fontSize: '30px', marginBottom: '30px' }}>게시글 작성</h3>

          <form onSubmit={onSubmitNewPost}>
            <StOptionWrapper>
              <StOptionHeader
                onClick={() => {
                  setIsOpen((prev) => !prev);
                }}
              >
                <span>{selectedOption || '카테고리'}</span>
                <span>{isOpen ? '▴' : '▾'}</span>
              </StOptionHeader>
              {isOpen && (
                <StOptionList>
                  {options.map((option) => (
                    <StOptionItem
                      key={option}
                      onClick={() => {
                        handelOptionClick(option);
                      }}
                    >
                      {option}
                    </StOptionItem>
                  ))}
                </StOptionList>
              )}
            </StOptionWrapper>
            <StLabel>제목</StLabel>
            <StInput type="text" value={postTitle} name="title" onChange={onChangePost} />
            <StLabel>내용</StLabel>
            <StInput type="text" value={postBody} name="body" onChange={onChangePost}></StInput>
            <StLabel>사진</StLabel>
            <StInput type="file" onChange={imgSelect}></StInput>
            <Button type="submit">확인</Button>
          </form>
        </StModalContents>
      </StModalBox>
    </>
  );
};

export default PostWrite;

export const StModalBox = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: '50%';
  left: '50%';
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const StModalContents = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
`;

export const StOptionWrapper = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const CloseButton = styled.button`
  margin-left: 370px;
  font-size: 16px;
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const StOptionHeader = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  font-weight: bold;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

export const StOptionList = styled.div`
  text-align: center;
  width: 23.1%;
  background-color: gray;
  position: absolute;
`;

export const StOptionItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const PostButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

export const StInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const StLabel = styled.label`
  font-weight: bold;
`;

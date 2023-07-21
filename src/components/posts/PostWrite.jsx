import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../service/firebase';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
// import { addPost } from '../../redux/modules/postsSlice';
import shortid from 'shortid';
import { __addPostSlice } from '../../redux/modules/postsSlice';

const PostWrite = ({ marker }) => {
  // console.log('작성', marker);

  useEffect(() => {}, [marker]);

  const options = ['관광', '식당', '카페', '숙소'];

  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(!isModal);
  };

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

  //hooks
  const dispatch = useDispatch();

  //event Handler
  const onSubmitNewPost = async (e) => {
    e.preventDefault();

    const newPost = {
      uid: auth.currentUser.uid,
      markerId: marker.id,
      markerPsiton: marker.position,
      postTitle: postTitle,
      postBody: postBody,
      postImg: postImg,
      category: option
    };

    dispatch(__addPostSlice(newPost));

    setPostTitle('');
    setPostBody('');
  };

  return (
    <>
      <button onClick={openModal}>작성</button>
      {isModal && (
        <StModalBox>
          <StModalContents>
            <h3>게시글 작성</h3>
            <button onClick={openModal}>닫기</button>
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
              <label>제목</label>
              <input type="text" value={postTitle} name="title" onChange={onChangePost} required />
              <label>내용</label>
              <input type="text" value={postBody} name="body" onChange={onChangePost} required></input>
              <label>사진</label>
              <input type="file" onChange={imgSelect}></input>
              <button type="submit">확인</button>
            </form>
          </StModalContents>
        </StModalBox>
      )}
    </>
  );
};

export default PostWrite;

export const StModalBox = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const StModalContents = styled.div`
  background-color: #fff;
`;

export const StOptionWrapper = styled.div`
  width: 100px;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

export const StOptionHeader = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

export const StOptionList = styled.div`
  width: 100px;
  background-color: #ffffff;
  position: absolute;
`;

export const StOptionItem = styled.div`
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

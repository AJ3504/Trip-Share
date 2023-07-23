import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '../../service/firebase';
import { __addPostSlice } from '../../redux/modules/postsSlice';
import { St } from '../../pages/DetailStyle';
import {
  StModalBox,
  StModalContents,
  CloseButton,
  StOptionHeader,
  StOptionWrapper,
  StOptionList,
  StOptionItem,
  StLabel,
  StInput
} from './PostStyle';
import { PostStButton } from '../common/PostStButton';

import Editor from '../Editor/Editor';

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

    // if (postTitle.trim() === '' || postBody.trim() === '') {
    //   alert('제목과 내용을 입력해주세요.');
    //   return;
    // }

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

  console.log('제목부분', postTitle);
  console.log('내용부분', postBody);
  return (
    <StModalBox>
      <StModalContents>
        <CloseButton
          onClick={() => {
            setIsModal(false);
          }}
        >
          ❌
        </CloseButton>
        <h3
          style={{
            textAlign: 'center',
            fontSize: '30px',
            marginBottom: '30px'
          }}
        >
          게시글 작성
        </h3>
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
          {/* <St.EditTextarea
            style={{ width: '425px' }}
            type="text"
            value={postBody}
            name="body"
            onChange={onChangePost}
          /> */}

          {/* 에디터로 변경테스트 */}
          {/* <Editor type="text" value={postBody} name="body" onChange={onChangePost} /> */}
          <Editor value={postBody} onChange={(value) => setPostBody(value)} />
          <br />
          <br />
          <br />
          <br />
          <br />

          <div style={{ marginLeft: '200px', marginBottom: '10px' }}>
            <StLabel>사진</StLabel>
          </div>
          <StInput style={{ width: '250px', marginLeft: '80px' }} type="file" onChange={imgSelect} />
          <PostStButton type="submit" style={{ marginLeft: '175px', marginBottom: '70px' }}>
            글 작성하기
          </PostStButton>
        </form>
      </StModalContents>
    </StModalBox>
  );
};

export default PostWrite;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { auth } from '../service/firebase';
import { __deletePostSlice, __getPostsSlice, __updatePostSlice } from '../redux/modules/postsSlice';
import { styled } from 'styled-components';
import useInput from '../hooks/useInput';
import { St } from './DetailStyle';
import { PostStButton } from '../components/common/PostStButton';

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postId } = useParams();
  // const prevTitle = location.state.prevTitle;
  // const prevBody = location.state.prevBody;

  const [editMode, setEditMode] = useState(false);
  const [editSelectAreaIsOpen, setEditSelectAreaIsOpen] = useState(false);
  const [editSelectedOption, setEditSelectedOption] = useState(null);
  const options = ['관광', '식당', '카페', '숙소'];

  const [newPostTitle, onChangeNewPostTitleHandler, resetNewPostTitle] = useInput('');
  const [newPostBody, onChangeNewPostBodyHandler, resetNewPostBody] = useInput('');

  useEffect(() => {
    const fetchData = () => {
      dispatch(__getPostsSlice());
    };

    fetchData();
  }, [dispatch]);

  const { postsData, isLoading, isError } = useSelector((state) => state.postsSlice);
  if (isLoading) {
    return <h1>아직 로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>오류가 발생했어요</h1>;
  }

  const targetPost = postsData.find((item) => item.id === postId);
  //------------------------------------------------------------------------------------------
  //event Handler
  const isSignedIn = auth.currentUser && targetPost.uid === auth.currentUser.uid;

  //Update
  const editModeHandler = async () => {
    const confirmed = window.confirm('정말 수정하시겠습니까?');
    if (confirmed) {
      setEditMode((prev) => !prev);
    }
  };

  const onSubmitEditHandler = async (e) => {
    e.preventDefault();

    if (!newPostTitle || !newPostBody) {
      alert('제목과 본문을 모두 입력해주세요!');
      return;
    } else if (newPostTitle.length < 5 || newPostBody.length < 5) {
      alert('제목과 본문을 5글자 이상 입력해주세요!');
      return;
    }

    const editedPost = {
      postTitle: newPostTitle,
      postBody: newPostBody,
      isModified: true,
      category: editSelectedOption,
      id: postId,
      markerPosition: targetPost.markerPosition
    };

    dispatch(__updatePostSlice(editedPost));

    resetNewPostTitle('');
    resetNewPostBody('');
  };

  const handleOptionClick = (option) => {
    setEditSelectedOption(option);
    setEditSelectAreaIsOpen(false);
  };

  //Delete
  const deleteHandler = async (targetPostId) => {
    if (!auth.currentUser) {
      alert('로그인 먼저 해주세요!');
      return;
    }
    if (targetPost.uid !== auth.currentUser.uid) {
      alert('삭제 권한이 없습니다.');
      return;
    }

    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (confirmed) {
      dispatch(__deletePostSlice(targetPostId));

      navigate('/');
    }
  };

  return (
    <St.WholeContainer>
      <div>
        {editMode ? (
          <St.EditModalContainer>
            <St.EditForm onSubmit={onSubmitEditHandler}>
              {/* ---selectArea------------------------------------ */}
              <div>
                <St.DropdownWrapper>
                  <St.DropdownHeader
                    onClick={() => {
                      setEditSelectAreaIsOpen((prev) => !prev);
                    }}
                  >
                    <span> {editSelectedOption || '선택해주세요!'} </span>
                    <span>▼</span>
                  </St.DropdownHeader>
                  {editSelectAreaIsOpen && (
                    <St.DropdownList>
                      {options.map((option) => (
                        <St.DropdownItem
                          key={option}
                          value={editSelectedOption}
                          onClick={() => {
                            handleOptionClick(option);
                          }}
                        >
                          {option}
                        </St.DropdownItem>
                      ))}
                    </St.DropdownList>
                  )}
                </St.DropdownWrapper>
              </div>
              {/* ---------------------------------------------------- */}
              <div className="editInputArea">
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={onChangeNewPostTitleHandler}
                  placeholder="제목을 5글자 이상 입력해주세요!"
                />
                <br />
                <textarea
                  type="text"
                  value={newPostBody}
                  onChange={onChangeNewPostBodyHandler}
                  placeholder="본문 내용을 5글자 이상 입력해주세요!"
                />
                <br />
                <PostStButton onClick={() => setEditMode(false)}>취소</PostStButton>
                <PostStButton onClick>수정 완료</PostStButton>
                <br />
              </div>
            </St.EditForm>
          </St.EditModalContainer>
        ) : null}
      </div>

      <St.DetailContainer>
        <St.DetailListsWrapper key={targetPost?.id}>
          <St.DetailList>
            <St.DetailBody>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{targetPost?.postTitle}</div>
              <br />
              <div>{targetPost?.postBody}</div>
              <div style={{ marginTop: '20px' }}>
                {isSignedIn ? (
                  <PostStButton onClick={editModeHandler} style={{ marginRight: '5px' }}>
                    수정하기
                  </PostStButton>
                ) : null}
                {isSignedIn ? (
                  <PostStButton onClick={() => deleteHandler(postId)} style={{ marginRight: '5px' }}>
                    삭제하기
                  </PostStButton>
                ) : null}
                <PostStButton onClick={() => navigate('/')}>이전 화면으로</PostStButton>
              </div>
            </St.DetailBody>
            <St.DetailImg>
              <img src={targetPost?.postImg} alt="이미지 없음" width={'200px'} height={'200px'} />
            </St.DetailImg>
          </St.DetailList>
        </St.DetailListsWrapper>
      </St.DetailContainer>
    </St.WholeContainer>
  );
};

export default Detail;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { auth } from '../service/firebase';
import { __deletePostSlice, __getPostsSlice, __updatePostSlice } from '../redux/modules/postsSlice';
import useInput from '../hooks/useInput';
import { St } from './DetailStyle';
import { PostStButton } from '../components/common/PostStButton';

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [editSelectAreaIsOpen, setEditSelectAreaIsOpen] = useState(false);
  const [editSelectedOption, setEditSelectedOption] = useState(null);
  const options = ['관광', '식당', '카페', '숙소'];

  const [newPostTitle, onChangeNewPostTitleHandler, resetNewPostTitle] = useInput('');
  const [newPostBody, onChangeNewPostBodyHandler, resetNewPostBody] = useInput('');

  //게시글 Data fetch
  useEffect(() => {
    const fetchDataAndWriterNickname = () => {
      dispatch(__getPostsSlice());
    };

    fetchDataAndWriterNickname();
  }, [dispatch]);

  const { postsData, isLoading, isError } = useSelector((state) => state.postsSlice);

  if (isLoading) {
    return <h1>아직 로딩 중입니다</h1>;
  }
  if (isError) {
    return <h1>오류가 발생했어요</h1>;
  }

  const targetPost = postsData.find((item) => item.id === postId);
  console.log(targetPost.writerNickname);
  console.log(targetPost.writerPhotoURL);

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
      markerPosition: targetPost.markerPosition,
      writerNickname: targetPost.writerNickname,
      writerPhotoURL: targetPost.writerPhotoURL,
      postImg: targetPost.postImg
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
              <St.EditInputWrapper>
                <St.TitleLabel>제목</St.TitleLabel>
                <St.EditInput
                  type="text"
                  value={newPostTitle}
                  onChange={onChangeNewPostTitleHandler}
                  placeholder="제목을 5글자 이상 입력해주세요!"
                />
                <br />
                <St.BodyLabel>내용</St.BodyLabel>
                <St.EditTextarea
                  type="text"
                  value={newPostBody}
                  onChange={onChangeNewPostBodyHandler}
                  placeholder="본문 내용을 5글자 이상 입력해주세요!"
                />
                <br />
                <div style={{ display: 'flex' }}>
                  <div style={{ marginLeft: 'auto' }}>
                    <PostStButton onClick={() => setEditMode(false)}>취소</PostStButton>
                    <PostStButton style={{ marginLeft: '5px' }}>수정 완료</PostStButton>
                  </div>
                </div>

                <br />
              </St.EditInputWrapper>
            </St.EditForm>
          </St.EditModalContainer>
        ) : null}
      </div>

      <St.DetailContainer>
        <St.DetailListsWrapper key={targetPost?.id}>
          <St.DetailList>
            <St.WriterInfoSection>
              <St.WriterInfoImageWrapper>
                <St.WriterInfoImage src={targetPost?.writerPhotoURL} alt="writerInfo" />
              </St.WriterInfoImageWrapper>
              <St.WriterInfoNickName>{targetPost?.writerNickname}</St.WriterInfoNickName>
            </St.WriterInfoSection>
            {/* ---------------------------------------------------- */}
            <St.ContentSection>
              <St.Article>
                <St.TitleLetter>{targetPost?.postTitle}</St.TitleLetter>
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
              </St.Article>
              <St.Img>
                <img
                  src={targetPost?.postImg}
                  alt="이미지 없음"
                  width={'200px'}
                  height={'200px'}
                  style={{ boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)' }}
                />
              </St.Img>
            </St.ContentSection>
          </St.DetailList>
        </St.DetailListsWrapper>
      </St.DetailContainer>
    </St.WholeContainer>
  );
};

export default Detail;

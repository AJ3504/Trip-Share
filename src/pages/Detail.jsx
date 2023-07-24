import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { auth } from '../service/firebase';
import { __deletePostSlice, __getPostsSlice, __updatePostSlice } from '../redux/modules/postsSlice';
import useInput from '../hooks/useInput';
import { St } from './DetailStyle';
import { PostStButton } from '../components/common/PostStButton';
import DOMPurify from 'dompurify';

import Editor from '../components/Editor/Editor';
import PostEditSelectArea from '../components/posts/PostEditSelectArea';
import PostEditInputArea from '../components/posts/PostEditInputArea';
import PostEditButtonArea from '../components/posts/PostEditButtonArea';
import Like from '../components/posts/Like';

const sanitizeHtml = (html) => {
  const sanitizedHtml = DOMPurify.sanitize(html);
  return { __html: sanitizedHtml };
};

const Detail = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [editSelectAreaIsOpen, setEditSelectAreaIsOpen] = useState(false);
  const [editSelectedOption, setEditSelectedOption] = useState(null);
  const options = ['관광', '식당', '카페', '숙소'];

  const [newPostTitle, onChangeNewPostTitleHandler, resetNewPostTitle] = useInput('');
  const [newPostBody, setNewPostBody] = useState('');

  const [createdAt, setCreatedAt] = useState(null);

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

    if (newPostTitle.trim() === '' || newPostBody.trim() === '') {
      alert('제목과 내용을 입력해주세요.');
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
      postImg: targetPost.postImg || null
    };

    dispatch(__updatePostSlice(editedPost));

    resetNewPostTitle('');
    setNewPostBody('');

    setEditMode(false);
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
            <St.EditModalContents>
              <St.EditModalInner>
                <St.EditForm onSubmit={onSubmitEditHandler}>
                  <PostEditSelectArea
                    handleOptionClick={handleOptionClick}
                    setEditSelectAreaIsOpen={setEditSelectAreaIsOpen}
                    editSelectedOption={editSelectedOption}
                    editSelectAreaIsOpen={editSelectAreaIsOpen}
                    options={options}
                  />
                  <St.EditInputWrapper>
                    <PostEditInputArea
                      newPostTitle={newPostTitle}
                      onChangeNewPostTitleHandler={onChangeNewPostTitleHandler}
                      Editor={Editor}
                      newPostBody={newPostBody}
                      setNewPostBody={setNewPostBody}
                      PostStButton={PostStButton}
                      setEditMode={setEditMode}
                    />
                  </St.EditInputWrapper>
                </St.EditForm>
              </St.EditModalInner>
            </St.EditModalContents>
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
              {/* <p>{new Date(createdAt * 1000).toLocaleString()}</p> */}
            </St.WriterInfoSection>
            <St.ContentSection>
              <St.Article>
                <PostEditButtonArea
                  isSignedIn={isSignedIn}
                  PostStButton={PostStButton}
                  editModeHandler={editModeHandler}
                  deleteHandler={deleteHandler}
                  postId={postId}
                />
                <St.TitleLetter>{targetPost?.postTitle}</St.TitleLetter>
                <br />
                {/* 에디터때문에 이 부분 수정했습니다  */}
                <div dangerouslySetInnerHTML={sanitizeHtml(targetPost?.postBody)} />
                <div style={{ marginTop: '20px' }}></div>
              </St.Article>
              <St.Img>
                {targetPost?.postImg && (
                  <img
                    src={targetPost?.postImg}
                    alt="이미지 없음"
                    width={'200px'}
                    height={'200px'}
                    style={{ boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)' }}
                  />
                )}
              </St.Img>
            </St.ContentSection>
            {/* -------------------------------------------------------- */}
            <hr style={{ marginTop: '80px' }} className="좋아요" />
            <St.LikeSection>
              <Like />
            </St.LikeSection>
          </St.DetailList>
        </St.DetailListsWrapper>
      </St.DetailContainer>
    </St.WholeContainer>
  );
});
export default Detail;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostEditButtonArea = ({ isSignedIn, PostStButton, editModeHandler, deleteHandler, postId }) => {
  const navigate = useNavigate();
  return (
    <>
      {isSignedIn ? (
        <>
          <PostStButton onClick={editModeHandler} style={{ marginRight: '5px' }}>
            수정하기
          </PostStButton>
          <PostStButton onClick={() => deleteHandler(postId)} style={{ marginRight: '5px' }}>
            삭제하기
          </PostStButton>
        </>
      ) : null}
      <PostStButton onClick={() => navigate('/')}>이전 화면으로</PostStButton>
    </>
  );
};

export default PostEditButtonArea;

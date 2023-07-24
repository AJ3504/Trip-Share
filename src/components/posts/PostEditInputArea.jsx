import React from 'react';
import { St } from '../../pages/DetailStyle';

const PostEditInputArea = ({
  newPostTitle,
  onChangeNewPostTitleHandler,
  Editor,
  newPostBody,
  setNewPostBody,
  PostStButton,
  setEditMode
}) => {
  return (
    <>
      <St.TitleLabel>제목</St.TitleLabel>
      <br />
      <St.EditInput
        type="text"
        value={newPostTitle}
        onChange={onChangeNewPostTitleHandler}
        placeholder="제목을 입력해주세요!"
      />
      <br />
      <St.BodyLabel>내용</St.BodyLabel>
      <br />
      <Editor
        style={{ width: '100%', height: '500px', marginTop: '20px' }}
        value={newPostBody}
        onChange={(value) => setNewPostBody(value)}
      />
      <br />
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ marginLeft: '150px', marginTop: '50px' }}>
          <PostStButton onClick={() => setEditMode(false)}>취소</PostStButton>
          <PostStButton style={{ marginLeft: '5px' }}>수정 완료</PostStButton>
        </div>
      </div>
    </>
  );
};

export default PostEditInputArea;

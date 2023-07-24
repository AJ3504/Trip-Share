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
      <St.EditInput
        type="text"
        value={newPostTitle}
        onChange={onChangeNewPostTitleHandler}
        placeholder="제목을 5글자 이상 입력해주세요!"
      />
      <br />
      <St.BodyLabel>내용</St.BodyLabel>
      {/* 에디터로 변경 */}
      <Editor
        style={{ width: '100%', height: '500px' }}
        value={newPostBody}
        onChange={(value) => setNewPostBody(value)}
      />
      {/* <St.EditTextarea
            type="text"
            value={newPostBody}
            onChange={onChangeNewPostBodyHandler}
            placeholder="본문 내용을 5글자 이상 입력해주세요!"
                /> */}
      <br />
      <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: '150px', marginTop: '50px' }}>
          <PostStButton onClick={() => setEditMode(false)}>취소</PostStButton>
          <PostStButton style={{ marginLeft: '5px' }}>수정 완료</PostStButton>
        </div>
      </div>
    </>
  );
};

export default PostEditInputArea;

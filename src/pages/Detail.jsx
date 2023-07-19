import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Detail = () => {
  //hooks
  const location = useLocation();
  const navigate = useNavigate();

  //useSelector
  const data = useSelector((state) => state.postsSlice);
  console.log(data);

  //넘겨받은 값
  const prevTitle = location.state.prevTitle;
  const prevBody = location.state.prevBody;
  const prevCategory = location.state.prevCategory;
  const postId = location.state.postId;
  const writerId = location.state.writerId;
  console.log(prevTitle, prevBody, prevCategory, postId, writerId);

  //others
  const targetPost = data.find((item) => item.id === postId);
  console.log(targetPost);

  return (
    <ul>
      <li key={targetPost?.id}>
        {targetPost?.postTitle}
        <br />
        {targetPost?.postBody}
      </li>
      <button>수정하기</button>
      <button>삭제하기</button>
      <button onClick={() => navigate('/')}>이전 화면으로</button>
    </ul>
  );
};

export default Detail;

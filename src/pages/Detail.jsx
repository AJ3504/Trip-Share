import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deletePost } from '../redux/modules/postsSlice';
import { auth, db } from '../service/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const Detail = () => {
  //hooks
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //useSelector
  const data = useSelector((state) => state.postsSlice);
  console.log(data);

  //넘겨받은 값
  const prevTitle = location.state.prevTitle;
  const prevBody = location.state.prevBody;
  const prevCategory = location.state.prevCategory;
  const postId = location.state.postId;
  const writerId = location.state.writerId;

  //others
  const targetPost = data.find((item) => item.id === postId);
  console.log(targetPost);

  //useStates
  //수정모드on, off
  const [editMode, setEditMode] = useState(false);

  //event Handler
  //Update
  const editModeHandler = async () => {
    if (!auth.currentUser) {
      alert('로그인 먼저 해주세요!');
      return;
    }
    if (targetPost.uid !== auth.currentUser.uid) {
      alert('수정 권한이 없습니다.');
      return;
    }

    const confirmed = window.confirm('정말 수정하시겠습니까?');
    if (confirmed) {
      setEditMode((prev) => !prev);
    }
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
      const postsRef = doc(db, 'posts', targetPostId);
      await deleteDoc(postsRef);

      dispatch(deletePost(targetPostId));

      navigate('/');
    }
  };

  return (
    <ul style={{ border: 'solid', margin: '10px', padding: '10px' }}>
      <li key={targetPost?.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          {targetPost?.postTitle}
          <br />
          {targetPost?.postBody}
          <div>
            <button onClick={editModeHandler}>수정하기</button>
            <button onClick={() => deleteHandler(postId)}>삭제하기</button>
            <button onClick={() => navigate('/')}>이전 화면으로</button>
          </div>
        </div>
        <div>
          <img src={targetPost?.postImg} alt="이미지 없음" />
        </div>
      </li>
    </ul>
  );
};

export default Detail;

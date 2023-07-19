import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deletePost } from '../redux/modules/postsSlice';
import { auth, db } from '../service/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { styled } from 'styled-components';

const Detail = ({ openModal, options }) => {
  //hooks
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //useSelector
  const data = useSelector((state) => state.postsSlice);
  console.log(data);

  //넘겨받은 값
  const { postId } = useParams();
  console.log(postId);

  //others
  const targetPost = data.find((item) => item.id === postId);
  console.log(targetPost);

  //useStates
  const [editMode, setEditMode] = useState(false);
  const [editSelectAreaIsOpen, setEditSelectAreaIsOpen] = useState(false);
  const [editSelectedOption, setEditSelectedOption] = useState(null);

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
    <>
      {/* ------게시글------ */}
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

      {/* ------수정폼------ */}
      <div>
        {editMode ? (
          <>
            <form onSubmit={onSubmitEditHandler}>
              {/* ---selectArea------------------------------------ */}
              <div>
                <DropdownWrapper>
                  <DropdownHeader
                    onClick={() => {
                      setEditSelectAreaIsOpen((prev) => !prev);
                    }}
                  >
                    <span> {editSelectedOption || '선택해주세요!'} </span>
                    <span>▼</span>
                  </DropdownHeader>

                  {editSelectAreaIsOpen && (
                    <DropdownList>
                      {options.map((option) => (
                        <DropdownItem
                          key={option}
                          value={editSelectedOption}
                          onClick={() => {
                            handleOptionClick(option);
                          }}
                        >
                          {option}
                        </DropdownItem>
                      ))}
                    </DropdownList>
                  )}
                </DropdownWrapper>
              </div>
              {/* ---------------------------------------------------- */}
              <div className="editInputArea">
                <input type="text" value={newTitle} onChange={onChangeNewTitleHandler} />
                <input type="text" value={newBody} onChange={onChangeNewBodyHandler} />
                <button>수정 완료</button>
              </div>
            </form>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Detail;

//selectArea
const DropdownWrapper = styled.div`
  width: 200px;
  border: 1px solid #ccc;
  position: relative;
  margin-bottom: 10px;
`;

const DropdownHeader = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const DropdownList = styled.div`
  border-top: 1px solid #ccc;
  /* 부모영역 바깥으로 삐져나오게 */
  position: absolute;
  width: 200px;
  border: 1px solid #ccc;
  background-color: #ffffff;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

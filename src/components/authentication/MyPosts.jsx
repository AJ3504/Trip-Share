import React, { useEffect } from 'react';
import { auth, db } from '../../service/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { __getPostsSlice } from '../../redux/modules/postsSlice';
import { useNavigate, useParams } from 'react-router-dom';

const MyPosts = () => {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  //useSelector
  // const myContents = useSelector((state) => state.)

  useEffect(() => {
    const fetchData = () => {
      dispatch(__getPostsSlice());
    };

    fetchData();
  }, [dispatch]);

  const { postsData, isLoading, isError, error } = useSelector((state) => state.postsSlice);
  console.log(postsData);
  const myPostsData = postsData.filter((item) => item.uid === auth.currentUser.uid);
  console.log(myPostsData);

  if (isLoading) {
    return <h1>아직 로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>오류가 발생했어요</h1>;
  }

  return (
    <div className="글목록">
      <div>
        {myPostsData?.map((myPostData) => {
          return (
            <ul style={{ border: 'solid', margin: '10px', padding: '10px' }}>
              <li key={myPostData.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <li>{myPostData.postTitle}</li>
                  <li>{myPostData.postBody}</li>
                  <div>
                    <button onClick={() => navigate(`/detail/${myPostData.id}`)}>자세히 보기</button>
                  </div>
                </div>
                <div>
                  <img src={myPostData.postImg} alt="이미지 없음" width={'70px'} height={'90px'} />
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default MyPosts;

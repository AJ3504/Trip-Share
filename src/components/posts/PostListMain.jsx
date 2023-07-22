import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __getPostsSlice, __postsSlice } from '../../redux/modules/postsSlice';

const PostListMain = ({ openSide, option, position }) => {
  console.log(position);

  const [] = useState();

  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(__getPostsSlice());
    };

    fetchData();
  }, [dispatch]);

  const { postsData, isLoading, isError, error } = useSelector((state) => state.postsSlice);

  if (isLoading) {
    return <h1>아직 로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>오류가 발생했어요</h1>;
  }

  const onPostClick = (post) => {
    navigate(`/detail/${post.id}`);
  };

  const statedPosts = postsData.filter(
    (post) =>
      post.markerPosition.lat > position.swLat &&
      post.markerPosition.lat < position.neLat &&
      post.markerPosition.lng > position.swLng &&
      post.markerPosition.lng < position.neLng
  );

  const filteredPosts = statedPosts.filter((post) => post.category === `${option}`);

  return (
    <StSideBox>
      {(option ? filteredPosts : statedPosts).map((post) => {
        return (
          <div key={post.id} style={{ border: 'solid', margin: '10px', padding: '10px', display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <ul>
                <li>{post.category}</li>
                <li>{post.postTitle}</li>
                <li>{post.postBody}</li>
                <button onClick={() => onPostClick(post)}>상세보기</button>
              </ul>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <img src={post.postImg} alt="Post Image" style={{ width: '80px', height: '80px' }} />
            </div>
          </div>
        );
      })}
    </StSideBox>
  );
};
export default PostListMain;

export const StSideBox = styled.ul`
  background-color: lightblue;
  width: 20%;
  height: 97.3%;
  right: 0;
  position: absolute;
  transition: 1s;
  z-index: 1; // 1로 수정 필요(박제이)
`;

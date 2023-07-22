import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { __getPostsSlice, __postsSlice } from '../../redux/modules/postsSlice';

const PostListMain = ({ openSide, option, position }) => {
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
          <div key={post.id} style={{ border: 'solid', margin: '10px', padding: '10px' }}>
            <ul>
              <li>{post.category}</li>
              <li>{post.postTitle}</li>
              <li>{post.postBody}</li>
              <li>위도{post.markerPosition.lat}</li>
              <li>경도{post.markerPosition.lng}</li>
              <button onClick={() => onPostClick(post)}>상세보기</button>
            </ul>
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
  height: 100%;
  right: 0px;
  position: absolute;
  transition: 1s;
  z-index: 999; // 1로 수정 필요(박제이)
`;

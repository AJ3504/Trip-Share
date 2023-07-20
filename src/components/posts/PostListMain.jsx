import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../service/firebase';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readPost } from '../../redux/modules/postsSlice';

const PostListMain = ({ openSide, option, position }) => {
  console.log(position);

  //useSelector
  const posts = useSelector((state) => state.postsSlice);
  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'posts'));
      const querySnapshot = await getDocs(q);
      const initialTils = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        initialTils.push(data);
      });
      dispatch(readPost(initialTils));
    };
    fetchData();
  }, []);

  //Event Handler
  const onPostClick = (post) => {
    navigate(`/detail/${post.id}`, {
      state: {
        prevTitle: post.postTitle,
        prevBody: post.postBody
      }
    });
  };

  const statedPosts = posts.filter(
    (post) =>
      post.markerPsition.lat > position.swLat &&
      post.markerPsition.lat < position.neLat &&
      post.markerPsition.lng > position.swLng &&
      post.markerPsition.lng < position.neLng
  );

  return (
    <StSideBox>
      <button onClick={openSide}>닫기</button>
      {statedPosts
        .filter((post) => post.category === `${option}`)
        .map((post) => {
          return (
            <div key={post.id} style={{ border: 'solid', margin: '10px', padding: '10px' }}>
              <ul>
                <li>{post.category}</li>
                <li>{post.postTitle}</li>
                <li>{post.postBody}</li>
                <li>위도{post.markerPsition.lat}</li>
                <li>경도{post.markerPsition.lng}</li>
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
  z-index: 999;
`;

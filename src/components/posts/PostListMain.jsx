import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../service/firebase';
import { styled } from 'styled-components';

const PostListMain = ({ openSide, option }) => {
  const [posts, setPosts] = useState([
    // {
    //   id: 1,
    //   location: '',
    //   category: '관광',
    //   keyword: '케이스포돔',
    //   userNickname: 'jennie',
    //   postTitle: 'Born Pink',
    //   postBody: 'World Tour Seoul Encore',
    //   postImg: ''
    // },
    // {
    //   id: 2,
    //   location: '',
    //   category: '음식점',
    //   keyword: '떡도리탕',
    //   userNickname: '풍자',
    //   postTitle: '또간집',
    //   postBody: '개맛있어',
    //   postImg: ''
    // }
  ]);

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
        // console.log('data', data);
        initialTils.push(data);
      });
      setPosts(initialTils);
    };
    fetchData();
  }, []);

  return (
    <StSideBox>
      <button onClick={openSide}>닫기</button>
      {posts
        .filter((post) => post.category === `${option}`)
        .map((post) => {
          return (
            <div key={post.id}>
              <div>{post.category}</div>
              <div>{post.postTitle}</div>
              <div>{post.postBody}</div>
              {/* <img src={post.postImg} /> */}
            </div>
          );
        })}
    </StSideBox>
  );
};

export default PostListMain;

export const StSideBox = styled.ul`
  background-color: lightblue;
  width: 400px;
  height: 100%;
  right: 0px;
  position: absolute;
  transition: 1s;
`;

import React, { useState } from 'react';
import PostWrite from '../posts/PostWrite';
import PostListMain from '../posts/PostListMain';

const Menu = () => {
  const options = ['관광', '식당', '카페', '숙소'];

  const [isSide, setIsSide] = useState(false);

  const openSide = () => {
    setIsSide(!isSide);
  };

  return (
    <div>
      <button onClick={openSide}>{options[0]}</button>
      {isSide && <PostListMain openSide={openSide} option={options[0]} />}
      {/* <button onClick={openSide}>{options[1]}</button>
      {isSide && <PostListMain openSide={openSide} option={options[1]} />}
      <button onClick={openSide}>{options[2]}</button>
      {isSide && <PostListMain openSide={openSide} option={options[2]} />}
      <button onClick={openSide}>{options[3]}</button>
      {isSide && <PostListMain openSide={openSide} option={options[3]} />} */}
      <PostWrite />
    </div>
  );
};

export default Menu;

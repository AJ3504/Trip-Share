import React, { useState } from 'react';
import PostWrite from '../posts/PostWrite';
import PostListMain from '../posts/PostListMain';

const Menu = () => {
  const options = ['관광', '식당', '카페', '숙소'];

  const [isModal, setIsModal] = useState(false);
  const [isSide, setIsSide] = useState(false);

  const openModal = () => {
    setIsModal(!isModal);
  };

  const openSide = () => {
    setIsSide(!isSide);
  };

  return (
    <div>
      {/* <button onClick={openSide}>{options[0]}</button>
      {isSide && <PostListMain openSide={openSide} option={options[0]} />} */}
      {/* <button onClick={openSide}>{options[1]}</button>
      {isSide && <PostListMain openSide={openSide} option={options[1]} />}
      <button onClick={openSide}>{options[2]}</button>
      {isSide && <PostListMain openSide={openSide} option={options[2]} />}
      <button onClick={openSide}>{options[3]}</button>
      {isSide && <PostListMain openSide={openSide} option={options[3]} />} */}
      <button onClick={openModal}>작성</button>
      {isModal && <PostWrite openModal={openModal} options={options} />}
    </div>
  );
};

export default Menu;

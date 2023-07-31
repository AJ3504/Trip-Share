import React from 'react';
import { PostStButton } from '../common/PostStButton';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  // 페이지 넘버를 담을 배열
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
      {pages.map((page, index) => {
        return (
          <PostStButton
            style={{ margin: '5px' }}
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page == currentPage ? 'active' : ''}
          >
            {page}
          </PostStButton>
        );
      })}
    </div>
  );
};

export default Pagination;

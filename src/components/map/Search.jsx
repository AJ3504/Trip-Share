import React from 'react';
import { StSearchInputContainer, StSearchInput } from './KakaoMap-Styled';
import { PostStButton } from '../common/PostStButton';

const Search = ({ searchKeyword, setSearchKeyword, handleSearch }) => {
  return (
    <StSearchInputContainer>
      <StSearchInput
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="추천하고 싶은 장소를 찾아주세요."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <PostStButton onClick={handleSearch}>검색</PostStButton>
    </StSearchInputContainer>
  );
};

export default Search;

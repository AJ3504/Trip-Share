import React from 'react';
import { SearchInput, Button } from './KakaoMap-Styled';

const Search = ({ searchKeyword, setSearchKeyword, handleSearch }) => {
  return (
    <>
      <SearchInput
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="검색어를 입력하세요"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Button onClick={handleSearch}>🔎</Button>
    </>
  );
};

export default Search;

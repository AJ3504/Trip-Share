import React from 'react';
import {
  StSearchResultContainer,
  StSearchImage,
  StSearchResultList,
  StSearchName,
  StSearchAddress,
  StSearchPhone,
  StSearchInfo
} from './KakaoMap-Styled';

const SearchResult = ({ searchResults, handleResultClick, thumbnails }) => {
  return (
    <StSearchResultContainer>
      {searchResults.map((result, index) => (
        <StSearchResultList key={result.id} onClick={() => handleResultClick({ lat: result.y, lng: result.x })}>
          <StSearchImage src={thumbnails[index]} alt={`thumbnail-${result.id}`} />
          <StSearchInfo>
            <StSearchName>{result.place_name}</StSearchName>
            <StSearchAddress>{result.address_name}</StSearchAddress>
            <StSearchPhone>{result.phone}</StSearchPhone>
          </StSearchInfo>
        </StSearchResultList>
      ))}
    </StSearchResultContainer>
  );
};

export default SearchResult;

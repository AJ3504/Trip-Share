import React from 'react';
import { StyledUl, Li, ThumbnailImage } from './KakaoMap-Styled';

const SearchResult = ({ searchResults, handleResultClick, thumbnails }) => {
  return (
    <StyledUl>
      {searchResults.map((result, index) => (
        <Li key={result.id} onClick={() => handleResultClick({ lat: result.y, lng: result.x })}>
          <div style={{ display: 'flex' }}>
            <ThumbnailImage src={thumbnails[index]} alt={`thumbnail-${result.id}`} />
            <div style={{ padding: '18px' }}>
              <h3>{result.place_name}</h3>
              <p>{result.address_name}</p>
              <p>{result.phone}</p>
            </div>
          </div>
        </Li>
      ))}
    </StyledUl>
  );
};

export default SearchResult;

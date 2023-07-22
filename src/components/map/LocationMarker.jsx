import React, { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import { ThumbnailImage, MarkerContent, MarkerContentContainer } from './KakaoMap-Styled';
import { PostButton } from '../posts/PostStyle';

const LocationMarker = ({ position, onClick, selectedMarker, thumbnail, setIsModal }) => {
  const handleWriteButtonClick = () => {
    setIsModal(true);
  };

  return (
    <>
      <MapMarker position={position} onClick={onClick}>
        {selectedMarker ? (
          <>
            <MarkerContentContainer>
              <ThumbnailImage src={thumbnail} alt={`thumbnail-${selectedMarker.content}`} />

              <MarkerContent>
                <h3>{selectedMarker.content}</h3>
                <p>{selectedMarker.address}</p>
                <PostButton onClick={handleWriteButtonClick}>✍️</PostButton>
              </MarkerContent>
            </MarkerContentContainer>
          </>
        ) : null}
      </MapMarker>
    </>
  );
};

export default LocationMarker;

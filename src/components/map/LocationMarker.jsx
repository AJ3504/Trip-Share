import React from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import { StMarkerName, StMarkerInfo, StMarkerAddress, StMarkerContents } from './KakaoMap-Styled';
import { PostStButton } from '../common/PostStButton';

const LocationMarker = ({ position, onClick, selectedMarker, setIsModal }) => {
  const handleWriteButtonClick = () => {
    setIsModal(true);
  };

  return (
    <>
      <MapMarker position={position} onClick={onClick}>
        {selectedMarker ? (
          <>
            <StMarkerContents>
              <StMarkerInfo>
                <StMarkerName>{selectedMarker.content}</StMarkerName>
                <StMarkerAddress>{selectedMarker.address}</StMarkerAddress>
              </StMarkerInfo>
              <PostStButton onClick={handleWriteButtonClick}>추천 글 작성</PostStButton>
            </StMarkerContents>
          </>
        ) : null}
      </MapMarker>
    </>
  );
};

export default LocationMarker;

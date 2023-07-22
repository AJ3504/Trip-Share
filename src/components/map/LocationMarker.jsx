import React, { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import { ThumbnailImage, MarkerContent, MarkerContentContainer } from './KakaoMap-Styled';

const LocationMarker = ({ position, onClick, selectedMarker, thumbnail, set }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <MapMarker position={position} onClick={onClick}>
        {selectedMarker ? (
          <>
            <MarkerContentContainer>
              <ThumbnailImage src={thumbnail} alt={`thumbnail-${selectedMarker.content}`} />
              <button onClick={openModal}>
                <img src={'/animation-write.gif'} alt="버튼 이미지" style={{ width: '30px', height: '30px' }} />
              </button>
              <MarkerContent>
                <h3>{selectedMarker.content}</h3>
                <p>{selectedMarker.address}</p>
              </MarkerContent>
            </MarkerContentContainer>
          </>
        ) : null}
      </MapMarker>
    </>
  );
};

export default LocationMarker;

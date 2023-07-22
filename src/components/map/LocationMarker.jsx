import React, { useState } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';
import { ThumbnailImage, MarkerContent, MarkerContentContainer } from './KakaoMap-Styled';
import PostWrite from '../posts/PostWrite';
import PostListMain from '../posts/PostListMain';

const LocationMarker = ({ position, onClick, selectedMarker, thumbnail }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [option, setOption] = useState('');
  const [state, setState] = useState({
    swLat: 0,
    swLng: 0,
    neLat: 90,
    neLng: 180
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log('나 LocationMarker 안에있어요', selectedMarker);

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
            {isModalOpen && <PostWrite marker={selectedMarker} setIsModal={closeModal} />}
          </>
        ) : null}
      </MapMarker>
    </>
  );
};

export default LocationMarker;

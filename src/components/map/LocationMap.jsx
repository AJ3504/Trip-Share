import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import LocationMarker from './LocationMarker';
import { useSelector } from 'react-redux';

const LocationMap = ({
  currentPosition,
  markers,
  onMarkerClick,
  selectedMarker,
  showDetails,
  thumbnails,
  setMap,
  setState,
  setIsModal
}) => {
  const { postsData } = useSelector((state) => state.postsSlice);

  const [option, setOption] = useState('');

  useEffect(() => {
    const iframeContainer = document.createElement('div');
    iframeContainer.id = 'place_url_iframe';
    document.getElementById('root').appendChild(iframeContainer);
    return () => {
      // 컴포넌트가 언마운트 될 때 iframe 컨테이너를 제거
      document.getElementById('root').removeChild(iframeContainer);
    };
  }, []);

  const handleCreateMap = (map) => {
    setMap(map); // map 객체를 설정
  };

  const filteredPosts = postsData.filter((post) => post.category === `${option}`);

  return (
    <Map
      center={currentPosition}
      style={{ width: '100%', height: '100%' }}
      onCreate={handleCreateMap}
      onBoundsChanged={(map) =>
        setState({
          swLat: map.getBounds().getSouthWest().Ma,
          swLng: map.getBounds().getSouthWest().La,
          neLat: map.getBounds().getNorthEast().Ma,
          neLng: map.getBounds().getNorthEast().La
        })
      }
    >
      <MapMarker position={currentPosition} height="fit-content" width="fit-content"></MapMarker>
      {markers.map((marker) => (
        <LocationMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => onMarkerClick(marker)}
          selectedMarker={selectedMarker === marker && showDetails ? selectedMarker : null}
          thumbnail={thumbnails[markers.indexOf(marker)]}
          setIsModal={setIsModal}
        />
      ))}
      {(option ? filteredPosts : postsData).map((post, index) => (
        <MapMarker
          key={`${post.postTitle}-${post.markerPosition}`}
          position={post.markerPosition}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            size: {
              width: 24,
              height: 35
            }
          }}
          title={post.postTitle}
        />
      ))}
    </Map>
  );
};

export default LocationMap;

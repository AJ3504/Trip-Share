import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import {
  Button2,
  Container,
  DetailsContainer,
  MarkerContentContainer,
  MapContainer,
  StyledIframe,
  MarkerContent,
  LeftContainer,
  ThumbnailImage
} from './KakaoMap-Styled';
import PostWrite from '../posts/PostWrite';
import PostListMain from '../posts/PostListMain';
import Search from './Search';
import SearchResult from './SearchResult';

const { kakao } = window;

const kakaoAPIKEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

const KakaoMap = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 33.5563, lng: 126.79581 });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const [state, setState] = useState({
    swLat: 0,
    swLng: 0,
    neLat: 90,
    neLng: 180
  });
  const [option, setOption] = useState('');

  const { postsData } = useSelector((state) => state.postsSlice);

  const searchBlogs = async (keyword) => {
    const apiUrl = `https://dapi.kakao.com/v2/search/blog?sort=accuracy&page=1&size=15&query=${encodeURIComponent(
      keyword
    )}`;
    const headers = {
      Authorization: 'KakaoAK ' + kakaoAPIKEY
    };

    try {
      const response = await fetch(apiUrl, { headers });
      const data = await response.json();

      if (data.documents.length > 0) {
        const thumbnail = data.documents[0].thumbnail;

        setThumbnails((prevThumbnails) => [...prevThumbnails, thumbnail]);
      } else {
        setThumbnails((prevThumbnails) => [
          ...prevThumbnails,
          'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ]);
      }

      // 검색 결과를 반환
      return data.documents;
    } catch (error) {
      console.error('블로그 검색 에러:', error);
      // 에러 발생 시 빈 배열을 반환
      return [];
    }
  };

  useEffect(() => {
    // 사용자의 현재 위치를 가져오는 코드
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('유저 정보를 가져오지 못했습니다:', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      }
    );

    const iframeContainer = document.createElement('div');
    iframeContainer.id = 'place_url_iframe';
    document.getElementById('root').appendChild(iframeContainer);
    return () => {
      // 컴포넌트가 언마운트 될 때 iframe 컨테이너를 제거
      document.getElementById('root').removeChild(iframeContainer);
    };
  }, []);

  const handleSearch = async () => {
    if (searchKeyword.trim() !== '') {
      setMarkers([]); // 기존 마커 초기화
      setThumbnails([]);

      //마커에 들어갈 내용을
      if (map) {
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchKeyword, async (data, status, pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();
            const markers = [];

            for (var i = 0; i < data.length; i++) {
              markers.push({
                position: {
                  lat: data[i].y,
                  lng: data[i].x
                },
                id: data[i].id,
                content: data[i].place_name,
                address: data[i].address_name,
                phone: data[i].phone,
                place_url: data[i].place_url
              });
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }

            setMarkers(markers);
            map.setBounds(bounds);

            // 검색 결과를 state에 저장하여 옆에 표시
            setSearchResults(data);

            // 검색 결과 안에 들어있는 place_name으로 카카오 블로그 서칭 실행
            for (const item of data) {
              const thumbnail = await searchBlogs(item.place_name);
            }
          }
        });
      }
    }
  };

  const handleResultClick = (position) => {
    setCurrentPosition(position);
    map.setLevel(3);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setCurrentPosition(marker.position);
    setShowDetails(true);
    map.setLevel(1);
  };

  return (
    <>
      <Container>
        {showDetails ? (
          <DetailsContainer>
            {selectedMarker && <StyledIframe title="place-details" src={selectedMarker.place_url} scrolling="no" />}
            <Button2 style={{ fontSize: '45px' }} onClick={() => setShowDetails(false)}>
              ⬅️
            </Button2>
          </DetailsContainer>
        ) : (
          <LeftContainer>
            <Search searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} handleSearch={handleSearch} />
            <SearchResult searchResults={searchResults} handleResultClick={handleResultClick} thumbnails={thumbnails} />
          </LeftContainer>
        )}

        <MapContainer>
          <Map
            center={currentPosition}
            style={{ width: '100%', height: '100%' }}
            onCreate={setMap}
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
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => handleMarkerClick(marker)}
              >
                {selectedMarker === marker && showDetails && (
                  <MarkerContentContainer>
                    <ThumbnailImage src={thumbnails[markers.indexOf(marker)]} alt={`thumbnail-${marker.content}`} />
                    <PostWrite marker={marker} />
                    <MarkerContent>
                      <h3>{marker.content}</h3>
                      <p>{marker.address}</p>
                    </MarkerContent>
                  </MarkerContentContainer>
                )}
              </MapMarker>
            ))}
            {postsData
              .filter((post) => post.category === `${option}`)
              .map((post, index) => (
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
        </MapContainer>
        <div>
          <button onClick={() => setOption('관광')}>관광</button>
          <button onClick={() => setOption('식당')}>식당</button>
          <button onClick={() => setOption('카페')}>카페</button>
          <button onClick={() => setOption('숙소')}>숙소</button>
          <PostListMain option={option} position={state} />
        </div>
      </Container>
    </>
  );
};

export default KakaoMap;

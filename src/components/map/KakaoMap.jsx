import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import {
  Button,
  Button2,
  Li,
  Container,
  LeftContainer,
  SearchInput,
  DetailsContainer,
  MarkerContentContainer,
  ThumbnailImage,
  MapContainer,
  StyledUl,
  StyledIframe,
  MarkerContent,
  Stdiv
} from './KakaoMap-Styled';
import PostWrite from '../posts/PostWrite';
import PostListMain from '../posts/PostListMain';

const { kakao } = window;

const kakaoAPIKEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

const KakaoMap = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 33.5563,
    lng: 126.79581
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  // 지도에 표시되는 영역 좌표
  const [state, setState] = useState({
    swLat: 0,
    swLng: 0,
    neLat: 90,
    neLng: 180
  });
  // 카테고리 button 활성화
  const [option, setOption] = useState('');

  // 게시글 작성 modal
  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
  };

  // 카테고리 게시글 data
  const { postsData } = useSelector((state) => state.postsSlice);

  // 카테고리 click 시 filter
  const filteredPosts = postsData.filter((post) => post.category === `${option}`);

  // 블로그 검색 함수
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
        // 사용자 현재 위치로 카테고리 게시글 기준 설정
        // setState();
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

  // 검색 버튼 클릭 시 또는 엔터키 눌렀을 때 검색 실행
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

  // 검색 결과 항목을 클릭했을 때 실행되는 함수 현재는 맵에서 이동
  const handleResultClick = (position) => {
    setCurrentPosition(position);
    map.setLevel(3);
  };

  // 마커를 클릭했을 때 선택된 마커 정보를 업데이트하는 함수
  // 제일 자세한 level로 보여주고 검색페이지를 열어줍니다
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setCurrentPosition(marker.position);
    setShowDetails(true);
    map.setLevel(1);
  };

  console.log(searchResults);

  return (
    <>
      <Container>
        {isModal && <PostWrite marker={selectedMarker} setIsModal={setIsModal} />}
        {showDetails ? (
          <DetailsContainer>
            {selectedMarker && (
              <StyledIframe
                title="place-details"
                src={`http://place.map.kakao.com/m/${selectedMarker.id}`}
                scrolling="no"
              />
            )}
            <Button2 style={{ fontSize: '45px' }} onClick={() => setShowDetails(false)}>
              ⬅️
            </Button2>
          </DetailsContainer>
        ) : (
          <LeftContainer>
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
                    {/* 게시글 작성 */}
                    <button onClick={openModal}>
                      <img src={'/animation-write.gif'} alt="버튼 이미지" style={{ width: '30px', height: '30px' }} />
                    </button>
                    <MarkerContent>
                      <h3>{marker.content}</h3>
                      <p>{marker.address}</p>
                    </MarkerContent>
                  </MarkerContentContainer>
                )}
              </MapMarker>
            ))}
            {/* 카테고리 장소 마커 */}
            {(option ? filteredPosts : postsData).map((post, index) => (
              <MapMarker
                key={`${post.postTitle}-${post.markerPosition}`}
                // 마커를 표시할 위치
                position={post.markerPosition}
                image={{
                  // 마커이미지의 주소입니다
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                  // 마커이미지의 크기입니다
                  size: {
                    width: 24,
                    height: 35
                  }
                }}
                // 마커에 마우스를 올리면 타이틀이 표시
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

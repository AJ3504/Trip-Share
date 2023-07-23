import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StButton,
  Container,
  StPlaceContainer,
  StMapContainer,
  StIframe,
  StSearchResult,
  StCategoryMenu,
  StLeftContainer,
  StMainBody,
  StPlaceDetail,
  StIframeContainer,
  StSearchContainer,
  StRightContainer,
  StMenuWrapper
} from './KakaoMap-Styled';
import PostWrite from '../posts/PostWrite';
import PostListMain from '../posts/PostListMain';
import Search from './Search';
import SearchResult from './SearchResult';
import LocationMap from './LocationMap';
import { PostStButton } from '../common/PostStButton';

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
  const [showPostList, setShowPostList] = useState(false);

  // 게시글 작성 modal
  const [isModal, setIsModal] = useState(false);

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

  const handleSearch = async () => {
    if (searchKeyword.trim() !== '') {
      setMarkers([]); // 기존 마커 초기화
      setThumbnails([]);

      if (map) {
        // map 객체가 올바르게 설정되었는지 확인
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
            map.setBounds(bounds); // map 객체가 설정되었으므로 setBounds 함수 사용 가능

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
    map.setLevel(3);
  };

  const togglePostList = () => {
    setShowPostList((prevShowPostList) => !prevShowPostList);
  };

  return (
    <>
      <StMainBody>
        {isModal && <PostWrite marker={selectedMarker} setIsModal={setIsModal} />}
        <StLeftContainer>
          {showDetails ? (
            <StPlaceContainer>
              {selectedMarker && (
                <StPlaceDetail>
                  <StIframeContainer>
                    <StIframe
                      title="place-details"
                      src={`http://place.map.kakao.com/m/${selectedMarker.id}`}
                      scrolling="no"
                    />
                  </StIframeContainer>
                  <StButton onClick={() => setShowDetails(false)}>←</StButton>
                </StPlaceDetail>
              )}
            </StPlaceContainer>
          ) : (
            <>
              <Search searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} handleSearch={handleSearch} />
              <SearchResult
                searchResults={searchResults}
                handleResultClick={handleResultClick}
                thumbnails={thumbnails}
              />
            </>
          )}
        </StLeftContainer>
        <StMapContainer>
          <LocationMap
            currentPosition={currentPosition}
            markers={markers}
            onMarkerClick={handleMarkerClick}
            selectedMarker={selectedMarker}
            showDetails={showDetails}
            thumbnails={thumbnails}
            setMap={setMap}
            setState={setState}
            setIsModal={setIsModal}
          />
        </StMapContainer>
        {/* component 분리 */}
        <StRightContainer>
          <StMenuWrapper>
            {/* <PostStButton onClick={togglePostList}>{showPostList ? '닫기' : '열기'}</PostStButton> */}
            <PostStButton style={{ fontSize: '8px' }} onClick={togglePostList}>
              {showPostList ? '⬆️' : '⬇️'}
            </PostStButton>
            <PostStButton
              onClick={() => {
                setOption(false);
                setShowPostList(true);
              }}
            >
              전체
            </PostStButton>
            <PostStButton
              onClick={() => {
                setOption('관광');
                setShowPostList(true);
              }}
            >
              관광
            </PostStButton>
            <PostStButton
              onClick={() => {
                setOption('식당');
                setShowPostList(true);
              }}
            >
              식당
            </PostStButton>
            <PostStButton
              onClick={() => {
                setOption('카페');
                setShowPostList(true);
              }}
            >
              카페
            </PostStButton>
            <PostStButton
              onClick={() => {
                setOption('숙소');
                setShowPostList(true);
              }}
            >
              숙소
            </PostStButton>
          </StMenuWrapper>
          {showPostList && <PostListMain option={option} position={state} />}
        </StRightContainer>
      </StMainBody>
    </>
  );
};

export default KakaoMap;

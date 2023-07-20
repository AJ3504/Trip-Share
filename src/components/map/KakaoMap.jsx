import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

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

  const displayBlogs = (blogData) => {
    return (
      <ul>
        {blogData.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url}>
              <img src={blog.thumbnail} alt="썸네일" />
              <h3>{blog.title}</h3>
              <p>{blog.contents}</p>
            </a>
          </li>
        ))}
      </ul>
    );
  };

  // 블로그 검색 함수
  const searchBlogs = (keyword) => {
    const apiUrl = `https://dapi.kakao.com/v2/search/blog?sort=accuracy&page=1&size=15&query=${encodeURIComponent(
      keyword
    )}`;
    const headers = {
      Authorization: 'KakaoAK ' + kakaoAPIKEY
    };

    fetch(apiUrl, {
      headers: headers
    })
      .then((response) => response.json())
      .then((data) => {
        const thumbnails = data.documents.map((document) => document.thumbnail);
        setThumbnails(thumbnails);
        displayBlogs(data.documents);
      })
      .catch((error) => {
        console.error('블로그 검색 에러:', error);
      });
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
      // 컴포넌트가 언마운트 될 때 iframe 컨테이너를 제거합니다.
      document.getElementById('root').removeChild(iframeContainer);
    };
  }, []);

  // 검색 버튼 클릭 시 또는 엔터키 눌렀을 때 검색 실행
  const handleSearch = () => {
    if (searchKeyword.trim() !== '') {
      setMarkers([]); // 기존 마커 초기화

      if (map) {
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchKeyword, (data, status, pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            const bounds = new kakao.maps.LatLngBounds();
            const markers = [];

            for (var i = 0; i < data.length; i++) {
              markers.push({
                position: {
                  lat: data[i].y,
                  lng: data[i].x
                },

                //마커안에 정보를 추가하고 싶으시다면 여기에 추가하시면 됩니다
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

            searchBlogs(searchKeyword);
          }
        });
      }
    }
  };

  // 검색 결과 항목을 클릭했을 때 실행되는 함수 현재는 맵에서 이동됩니다
  const handleResultClick = (position) => {
    setCurrentPosition(position);
    map.setLevel(3);
  };

  // 마커를 클릭했을 때 선택된 마커 정보를 업데이트하는 함수 제일 자세한 level로 보여주고 검색페이지를 열어줍니다
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setCurrentPosition(marker.position);
    setShowDetails(true);
    map.setLevel(3);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ padding: '10px', flex: 1 }}>
          <input
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
          <button onClick={handleSearch}>검색</button>
          {showDetails ? (
            <div>
              <button onClick={() => setShowDetails(false)}>돌아가기</button>
              {selectedMarker && (
                <iframe
                  title="place-details"
                  src={selectedMarker.place_url}
                  style={{ width: '100%', height: '880px' }}
                />
              )}
            </div>
          ) : (
            <ul style={{ height: '880px', overflowY: 'scroll' }}>
              {searchResults.map((result, index) => (
                <li
                  key={result.id}
                  style={{ padding: '18px', cursor: 'pointer', border: '1px solid green' }}
                  onClick={() => handleResultClick({ lat: result.y, lng: result.x })}
                >
                  <div style={{ display: 'flex' }}>
                    <img
                      src={thumbnails[index]}
                      alt={`thumbnail-${result.id}`}
                      style={{ width: '100px', height: '100px', margin: '5px' }}
                    />
                    <div style={{ padding: '18px' }}>
                      <h3>{result.place_name}</h3>
                      <p>{result.address_name}</p>
                      <p>{result.phone}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ width: '70%', height: '900px' }}>
          <Map center={currentPosition} style={{ width: '100%', height: '100%' }} onCreate={setMap}>
            <MapMarker position={currentPosition} height="fit-content">
              125% 모두 화이팅입니다!
            </MapMarker>
            {markers.map((marker) => (
              <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => handleMarkerClick(marker)}
              >
                {selectedMarker === marker && showDetails && (
                  <div
                    style={{
                      width: 'fit-content',
                      height: 'fit-content',
                      backgroundColor: 'white',
                      borderRadius: '5px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={thumbnails[markers.indexOf(marker)]}
                      alt={`thumbnail-${marker.content}`}
                      style={{ width: '100px', height: '100px', margin: '5px' }}
                    />
                    <div style={{ marginTop: '30px' }}>
                      <h3>{marker.content}</h3>
                      <p>{marker.address}</p>
                    </div>
                  </div>
                )}
              </MapMarker>
            ))}
          </Map>
        </div>
      </div>
    </>
  );
};

export default KakaoMap;

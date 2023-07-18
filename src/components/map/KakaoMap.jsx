import React, { useEffect, useState } from 'react';

const { kakao } = window;

const KakaoMap = () => {
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const ps = new kakao.maps.services.Places();

  // 검색 결과 목록을 담을 상태 변수
  const [searchResults, setSearchResults] = useState([]);

  //카카오맵 불러오기
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };

    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488);
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
    setMap(map);
    setMarkers([marker]);

    //사용자의 현재 위치를 가져오는 코드
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        map.setCenter(currentPos);
        marker.setPosition(currentPos);
      },
      () => alert('위치 정보를 가져오는데 실패했습니다.'),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      }
    );
  }, []);

  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      removeMarker();
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      const bounds = new kakao.maps.LatLngBounds();
      const results = [];

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));

        // 검색 결과 목록에 추가할 데이터
        const placeData = {
          placeName: data[i].place_name,
          address: data[i].address_name,
          phone: data[i].phone
        };
        results.push(placeData);
      }

      // 검색 결과 목록을 상태 변수에 저장
      setSearchResults(results);

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  }

  function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x)
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
    });

    setMarkers((prevMarkers) => [...prevMarkers, marker]);
  }

  const handleSearch = () => {
    if (searchKeyword.trim() === '') {
      alert('검색어를 입력해주세요.');
      return;
    }

    ps.keywordSearch(searchKeyword, placesSearchCB);
  };

  // 인포윈도우에 장소명을 표시합니다
  function displayInfowindow(marker, title) {
    const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
  }

  // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }

  // 지도 위에 표시되고 있는 모든 마커를 제거합니다
  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]); // 빈 배열로 초기화하여 마커 삭제
  }

  return (
    <>
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="지역을 입력해 주세요"
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      <div style={{ width: '300px', height: '500px', overflowY: 'scroll', float: 'left' }}>
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>
              <h4>{result.placeName}</h4>
              <p>{result.address}</p>
              <p>{result.phone}</p>
            </li>
          ))}
        </ul>
      </div>

      <div id="map" style={{ width: '700px', height: '500px', float: 'left' }}></div>
    </>
  );
};

export default KakaoMap;

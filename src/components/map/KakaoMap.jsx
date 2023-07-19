import React, { useEffect, useState } from 'react';
import Menu from '../header/Menu';

const { kakao } = window;

const KakaoMap = () => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const ps = new kakao.maps.services.Places();

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
    setMarker(marker);

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
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      var bounds = new kakao.maps.LatLngBounds();

      for (var i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
      console.log('검색 범위', bounds);
    }
  }

  function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x)
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + `</div>`);
      infowindow.open(map, marker);
      console.log(place.place_name);
      console.log(marker);
    });
  }

  const handleSearch = () => {
    if (searchKeyword.trim() === '') {
      alert('검색어를 입력해주세요.');
      return;
    }

    ps.keywordSearch(searchKeyword, placesSearchCB);
  };

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
      <div id="map" style={{ width: '1000px', height: '700px' }} />
    </>
  );
};

export default KakaoMap;

import React, { useEffect, useState } from 'react';

const { kakao } = window;

const KakaoMap = () => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();

  useEffect(() => {
    // 카카오 지도 초기화 코드
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

    // 사용자의 현재 위치를 가져오는 코드
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

    // 장소 검색 함수
    function searchPlaces() {
      var keyword = document.getElementById('keyword').value;

      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색 결과 콜백 함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수
    function displayPlaces(places) {
      var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

      removeAllChildNods(listEl);
      removeMarker();

      for (var i = 0; i < places.length; i++) {
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]);

        bounds.extend(placePosition);

        (function (marker, title) {
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      map.setBounds(bounds);
    }

    function getListItem(index, places) {
      var el = document.createElement('li'),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          '   <h5>' +
          places.place_name +
          '</h5>';

      if (places.road_address_name) {
        itemStr +=
          '    <span>' +
          places.road_address_name +
          '</span>' +
          '   <span class="jibun gray">' +
          places.address_name +
          '</span>';
      } else {
        itemStr += '    <span>' + places.address_name + '</span>';
      }

      itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

      el.innerHTML = itemStr;
      el.className = 'item';

      return el;
    }

    function addMarker(position, idx, title) {
      var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
        imageSize = new kakao.maps.Size(36, 37),
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691),
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
          offset: new kakao.maps.Point(13, 37)
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
          position: position,
          image: markerImage
        });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    }

    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayInfowindow(marker, title) {
      var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

    // 검색 결과 목록을 담을 배열
    var markers = [];

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 검색 버튼 클릭 시 장소 검색 함수 호출
    document.getElementById('searchBtn').onclick = searchPlaces;

    // 검색 결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    var infowindow = new kakao.maps.InfoWindow({
      zIndex: 1
    });
  }, []);

  return (
    <>
      <input type="text" id="keyword" />
      <button id="searchBtn">검색</button>

      <div style={{ display: 'flex' }}>
        <div id="menu_wrap" style={{ width: '20%', height: '700px', overflowY: 'scroll' }}>
          <ul id="placesList"></ul>
          <div id="pagination" style={{ textAlign: 'center' }}></div>
        </div>

        <div id="map" style={{ width: '80%', height: '700px' }}></div>
      </div>
    </>
  );
};

export default KakaoMap;

import React, { useEffect, useState } from 'react';
// import TourAPI from './TourAPI';
import Menu from '../header/Menu';

const { kakao } = window;

const KakaoMap = () => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [selectedPlaceUrl, setSelectedPlaceUrl] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(true);

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
    const searchPlaces = () => {
      const keyword = document.getElementById('keyword').value;

      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB);
    };

    // 장소검색 결과 콜백 함수
    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    };

    const addMarkerClickEvent = (marker, place_url) => {
      kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedPlaceUrl(place_url);

        setShowSearchResults(false);
      });
    };

    // 검색 결과 목록 클릭 이벤트 리스너를 추가하는 함수
    const addListItemClickEvent = (itemEl, marker, title, address, phone) => {
      itemEl.onclick = () => {
        setSelectedPlaceUrl(null);
      };
    };

    // 검색 결과 목록과 마커를 표출하는 함수
    const displayPlaces = (places) => {
      console.log(places);
      const listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

      removeAllChildNods(listEl);
      removeMarker();

      for (let i = 0; i < places.length; i++) {
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        const marker = addMarker(
          placePosition,
          i,
          places[i].place_name,
          places[i].address,
          places[i].phone,
          places[i].place_url
        );
        const itemEl = getListItem(i, places[i], marker);

        bounds.extend(placePosition);

        //이곳은 지도의 마커 마우스오버입니다!
        ((marker, title) => {
          kakao.maps.event.addListener(marker, 'mouseover', () => {
            displayInfowindow(marker, title, places[i].address_name, places[i].phone, places[i].place_url);
          });

          kakao.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close();
          });

          //이곳은 검색결과 마우스오버입니다!
          itemEl.onmouseover = () => {
            displayInfowindow(marker, title, places[i].address_name, places[i].phone, places[i].place_url);
          };

          itemEl.onmouseout = () => {
            infowindow.close();
          };

          addMarkerClickEvent(marker, places[i].place_url, places[i].place_name, places[i].address, places[i].phone);

          addListItemClickEvent(itemEl, marker, places[i].place_name, places[i].address, places[i].phone);
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      map.setBounds(bounds);

      setShowSearchResults(true);
    };

    //여기서 places안의 내용을 보고 추가해야 합니다! 아래 contentStr 부분
    const getListItem = (index, places) => {
      const itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        '<h5>' +
        places.place_name +
        '</h5>';
      let addressStr = '';
      if (places.road_address_name) {
        addressStr +=
          '<span>' +
          places.road_address_name +
          '</span>' +
          '<span class="jibun gray">' +
          places.address_name +
          '</span>';
      } else {
        addressStr += '<span>' + places.address_name + '</span>';
      }

      //이 부분이 검색결과에 보이는 부분입니다
      const contentStr = itemStr + addressStr + '  <span class="tel">' + places.phone + '</span>' + '</div>';

      const el = document.createElement('li');
      el.innerHTML = contentStr;
      el.className = 'item';

      return el;
    };

    //마커 추가 함수
    const addMarker = (position, idx) => {
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
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
    };

    //마커 제거 함수
    const removeMarker = () => {
      markers.forEach((marker) => marker.setMap(null));
      markers.length = 0;
    };

    //검색결과 페이지네이션 부분입니다
    const displayPagination = (pagination) => {
      let paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = ((i) => {
            return () => {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    };

    //이 부분이 마커 마우스 오버시 보이는 부분입니다
    const displayInfowindow = (marker, place_name, address_name, phone) => {
      const content =
        '<div ">' +
        '<h4>' +
        place_name +
        '</h4>' +
        '<p>주소: ' +
        address_name +
        '</p>' +
        '<p>전화번호: ' +
        (phone ? phone : '전화번호가 없습니다.') +
        '</p>' +
        '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);

      map.panTo(marker.getPosition());

      map.setLevel(3);
    };

    const removeAllChildNods = (el) => {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    };

    // 검색 결과 목록을 담을 배열
    const markers = [];

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    // 검색 버튼 클릭 시 장소 검색 함수 호출
    document.getElementById('searchBtn').onclick = searchPlaces;

    // 엔터키
    document.getElementById('keyword').onkeydown = (event) => {
      if (event.key === 'Enter') {
        searchPlaces();
      }
    };

    // 검색 결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    const infowindow = new kakao.maps.InfoWindow({
      zIndex: 1
      // 마커에 클릭이벤트를 등록합니다
    });
  }, []);

  const handleShowSearchResults = () => {
    // 검색 결과 보여주는 상태로 변경
    setShowSearchResults(true);
    // 선택된 장소 URL 초기화
    setSelectedPlaceUrl(null);
  };

  return (
    <>
      <div style={{ display: 'flex', marginTop: '30px' }}>
        <div
          id="menu_wrap"
          style={{
            width: '40%',
            height: '930px',
            overflow: showSearchResults ? 'scroll' : 'hidden'
          }}
        >
          <div className="Input-Container" style={{ textAlign: 'center' }}>
            <input type="text" id="keyword" placeholder="검색어를 입력해주세요" />
            <button id="searchBtn">검색</button>
          </div>
          {showSearchResults ? (
            <>
              <ul id="placesList"></ul>
              <div id="pagination" style={{ textAlign: 'center' }}></div>
            </>
          ) : (
            <div>
              <button onClick={handleShowSearchResults}>검색 페이지 종료</button>
              {selectedPlaceUrl && (
                <iframe title="place-details" src={selectedPlaceUrl} style={{ width: '100%', height: '880px' }} />
              )}
            </div>
          )}
        </div>
        <div id="map" style={{ width: '60%', height: '930px' }}></div>
      </div>
      {/* <TourAPI /> */}
    </>
  );
};

export default KakaoMap;

// import React, { useState } from 'react';

// const kakaoAPIKEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

// const Search = (props) => {
//   const [thumbnails, setThumbnails] = useState([]);

//   // 블로그 검색 함수
//   const searchBlogs = async (keyword) => {
//     const apiUrl = `https://dapi.kakao.com/v2/search/blog?sort=accuracy&page=1&size=15&query=${encodeURIComponent(
//       keyword
//     )}`;
//     const headers = {
//       Authorization: 'KakaoAK ' + kakaoAPIKEY
//     };

//     try {
//       const response = await fetch(apiUrl, { headers });
//       const data = await response.json();

//       if (data.documents.length > 0) {
//         const thumbnail = data.documents[3].thumbnail;

//         setThumbnails((prevThumbnails) => [...prevThumbnails, thumbnail]);
//       } else {
//         setThumbnails((prevThumbnails) => [
//           ...prevThumbnails,
//           'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1600'
//         ]);
//       }

//       return data.documents; // 검색 결과를 반환합니다.
//     } catch (error) {
//       console.error('블로그 검색 에러:', error);
//       return []; // 에러 발생 시 빈 배열을 반환합니다.
//     }
//   };

//   // 검색 버튼 클릭 시 또는 엔터키 눌렀을 때 검색 실행
//   const handleSearch = async () => {
//     if (searchKeyword.trim() !== '') {
//       setMarkers([]); // 기존 마커 초기화
//       setShowScroll(true);
//       setThumbnails([]);

//       //마커에 들어갈 내용을
//       if (map) {
//         const ps = new kakao.maps.services.Places();
//         ps.keywordSearch(searchKeyword, async (data, status, pagination) => {
//           if (status === kakao.maps.services.Status.OK) {
//             const bounds = new kakao.maps.LatLngBounds();
//             const markers = [];

//             for (var i = 0; i < data.length; i++) {
//               markers.push({
//                 position: {
//                   lat: data[i].y,
//                   lng: data[i].x
//                 },
//                 id: data[i].id,
//                 content: data[i].place_name,
//                 address: data[i].address_name,
//                 phone: data[i].phone,
//                 place_url: data[i].place_url
//               });
//               bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
//             }

//             setMarkers(markers);
//             map.setBounds(bounds);

//             // 검색 결과를 state에 저장하여 옆에 표시
//             setSearchResults(data);

//             // 검색 결과 안에 들어있는 place_name으로 카카오 블로그 서칭 실행
//             for (const item of data) {
//               const thumbnail = await searchBlogs(item.place_name);
//             }
//           }
//         });
//       }
//     }
//   };

//   return <></>;
// };

// export default Search;

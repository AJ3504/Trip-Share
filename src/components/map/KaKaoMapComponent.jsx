// import React, { useState } from 'react';
// import { Map, MapMarker } from 'react-kakao-maps-sdk';
// import PostWrite from '../posts/PostWrite';
// import { MarkerContentContainer, ThumbnailImage, MarkerContent } from './KakaoMap-Styled';

// const KaKaoMapComponent = ({
//   currentPosition,
//   markers,
//   selectedMarker,
//   showDetails,
//   thumbnails,
//   handleMarkerClick,
//   postsData,
//   option,
//   onBoundsChanged
// }) => {
//   const [map, setMap] = useState([]);

//   return (
//     <Map
//       center={currentPosition}
//       style={{ width: '100%', height: '100%' }}
//       onCreate={(map) => handleMapCreated(map)}
//       onBoundsChanged={(map) => onBoundsChanged(map)}
//     >
//       <MapMarker position={currentPosition} height="fit-content" width="fit-content"></MapMarker>
//       {markers.map((marker) => (
//         <MapMarker
//           key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
//           position={marker.position}
//           onClick={() => handleMarkerClick(marker)}
//         >
//           {selectedMarker === marker && showDetails && (
//             <MarkerContentContainer>
//               <ThumbnailImage src={thumbnails[markers.indexOf(marker)]} alt={`thumbnail-${marker.content}`} />
//               <PostWrite marker={marker} />
//               <MarkerContent>
//                 <h3>{marker.content}</h3>
//                 <p>{marker.address}</p>
//               </MarkerContent>
//             </MarkerContentContainer>
//           )}
//         </MapMarker>
//       ))}
//       {postsData
//         .filter((post) => post.category === `${option}`)
//         .map((post, index) => (
//           <MapMarker
//             key={`${post.postTitle}-${post.markerPosition}`}
//             position={post.markerPosition}
//             image={{
//               src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
//               size: {
//                 width: 24,
//                 height: 35
//               }
//             }}
//             title={post.postTitle}
//           />
//         ))}
//     </Map>
//   );
// };

// export default KaKaoMapComponent;

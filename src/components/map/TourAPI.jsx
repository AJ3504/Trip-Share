import React, { useEffect, useState } from 'react';

const TourAPI = () => {
  const [galleryData, setGalleryData] = useState([]);

  const TOUR_API_KEY = process.env.REACT_APP_TOUR_API_KEY;
  console.log('TOUR API키', TOUR_API_KEY);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://apis.data.go.kr/B551011/PhotoGalleryService1/galleryList1?serviceKey=${TOUR_API_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TestApp&_type=json`
        );
        if (!response.ok) {
          throw new Error('API 호출에 실패했습니다.');
        }
        const data = await response.json();
        console.log(data);

        // setGalleryData(data);
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {galleryData.map((item) => (
        <img key={item.gallerySn} src={item.imageUrl} alt={item.galleryTitle} />
      ))}
    </div>
  );
};

export default TourAPI;

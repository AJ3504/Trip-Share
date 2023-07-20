import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NaverImageSearch = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // 네이버 검색 API 호출
    const fetchImages = async () => {
      const apiKey = 'YOUR_NAVER_API_KEY';
      const query = '검색어'; // 이미지를 검색할 키워드
      const apiUrl = `https://openapi.naver.com/v1/search/image.json?query=${encodeURIComponent(query)}`;

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'X-Naver-Client-Id': apiKey,
            'X-Naver-Client-Secret': 'YOUR_NAVER_API_SECRET' // 네이버 API secret 키
          }
        });

        setImages(response.data.items);
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>네이버 이미지 검색 결과</h2>
      <ul>
        {images.map((image) => (
          <li key={image.link}>
            <img src={image.link} alt={image.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NaverImageSearch;

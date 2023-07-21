import React, { useState, useEffect } from 'react';

const CategoryImage = () => {
  const [randomImageUrl, setRandomImageUrl] = useState(null);

  // 카테고리별 이미지 배열
  const categoryImages = {
    관광: [
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%97%AC%ED%96%891.jpg?alt=media&token=b5c38c12-1537-4627-938f-91ca6519bdc2',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%97%AC%ED%96%892.jpg?alt=media&token=7d9ecb8b-3648-4ba6-b33d-017542cc4999',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%97%AC%ED%96%893.jpg?alt=media&token=03d7c746-54a5-4014-a0b5-e2c1faf0d672',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%97%AC%ED%96%894.jpg?alt=media&token=244c5a4b-6937-4516-bfd4-38e45c67f2be',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%97%AC%ED%96%895.jpg?alt=media&token=824a4b3e-808f-4815-bbef-ff1812253e69'
    ],
    식당: [
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%ED%95%9C%EA%B5%AD%EC%8B%9D%EB%8B%B9.jpg?alt=media&token=ef2f56b4-cc29-47e7-ba34-5f99fecdf1a1',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EB%A0%88%EC%8A%A4%ED%86%A0%EB%9E%91.jpg?alt=media&token=65a1bcde-12e5-4d33-adb5-126b6c22c5a1',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%8B%9D%EB%8B%B9%20%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg?alt=media&token=89bfa8a8-10b1-4ede-a08c-865541a24e68',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%8B%9D%EB%8B%B92.jpg?alt=media&token=eaa65ddc-988c-4af4-9979-13ed6799ccb8',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%8B%9D%EB%8B%B91.jpg?alt=media&token=9fdb50c2-bfd8-41bc-8e7d-21baef57bf03'
    ],
    카페: [
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%B9%B4%ED%8E%981.jpg?alt=media&token=8e8ca79f-3461-4399-951b-7f226b3f9daa',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%B9%B4%ED%8E%982.jpg?alt=media&token=c69a6c87-6667-4f88-b045-f1cbf97bb32b',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%B9%B4%ED%8E%983.jpg?alt=media&token=7e6ad4ec-7e4c-46e7-b1c7-c985ad398a0a',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%B9%B4%ED%8E%984.jpg?alt=media&token=ef04e47b-2072-4983-87c9-6466d25410f4',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%B9%B4%ED%8E%985.jpg?alt=media&token=6dc993f2-14db-4c54-8303-4dfc385a5958'
    ],
    숙소: [
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%88%99%EC%86%8C1.jpg?alt=media&token=0eeaf410-b27d-4fbf-9f5d-744c07e9767a',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%88%99%EC%86%8C2.jpg?alt=media&token=8511d18c-77ee-4330-ac3b-5570342c0081',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%88%99%EC%86%8C3.jpg?alt=media&token=d349707a-96e7-4222-9608-40cdd2cfa159',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%88%99%EC%86%8C4.jpg?alt=media&token=9fb790bf-1070-4006-a455-edd1bef828ee',
      'https://firebasestorage.googleapis.com/v0/b/tripshare-e3d12.appspot.com/o/posts%2F%EC%88%99%EC%86%8C5.jpg?alt=media&token=11a300f0-ca98-492c-be08-089019e9f342'
    ]
  };

  useEffect(() => {
    setRandomImageUrl(getRandomImage());
  }, []);

  // 랜덤 이미지를 가져오는 함수
  const getRandomImage = () => {
    const categories = Object.keys(categoryImages);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const images = categoryImages[randomCategory];
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <div>
      <img src={randomImageUrl} alt="카테고리 이미지" style={{ width: '60px', height: '60px' }} />
    </div>
  );
};

export default CategoryImage;

import React from 'react';

const kakaoAPIKEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

const BlogSearch = () => {
  const [thumbnails, setThumbnails] = useState([]);

  const displayBlogs = (blogData) => {
    return (
      <ul>
        {blogData.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
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
        console.log(thumbnails);
        displayBlogs(data.documents);
      })
      .catch((error) => {
        console.error('Error fetching blog search results:', error);
      });
  };

  return <div>BlogSearch</div>;
};

export default BlogSearch;

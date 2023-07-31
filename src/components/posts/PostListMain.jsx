import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StPostContainer, StPostList } from './PostStyle';
import { __getMainPostsSlice } from '../../redux/modules/mainPostsSlice';
import { getMainLikes, getMainPosts } from '../../api/mainPosts';
import { __getPostsSlice } from '../../redux/modules/postsSlice';
import Loader from './Loader';

const PostListMain = ({ option, position }) => {
  const [] = useState();

  //html 태그 없애는 함수
  const stripHtmlTags = (htmlString) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.textContent || div.innerText || '';
  };

  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 무한스크롤
  const [sortByLike, setSortByLike] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [page, setPage] = useState(1);
  const [scrollLoading, setScrollLoading] = useState(true);

  const function1 = async () => {
    const { postsData } = await getMainPosts(page); // getMainPosts()에 인자로 page를 넘겨주고
    setPostsData((prev) => [...prev, ...postsData]);
    setScrollLoading(false);
  };

  useEffect(() => {
    function1();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setScrollLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 좋아요
  useEffect(() => {
    const fetchData = () => {
      dispatch(__getPostsSlice());
    };

    fetchData();
  }, [dispatch]);

  const { likesData, isLoading, isError, error } = useSelector((state) => state.postsSlice);

  if (isLoading) {
    return <h1>아직 로딩 중입니다</h1>;
  }
  if (isError) {
    return <h1>오류가 발생했어요</h1>;
  }

  // 좋아요 정렬 미적용
  const statedPosts = postsData.filter(
    (post) =>
      post.markerPosition.lat > position.swLat &&
      post.markerPosition.lat < position.neLat &&
      post.markerPosition.lng > position.swLng &&
      post.markerPosition.lng < position.neLng
  );

  const filteredPosts = statedPosts.filter((post) => post.category === `${option}`);

  // 좋아요 정렬 적용
  const sortedByLikePosts = [...postsData].sort((a, b) => {
    const aLikes = likesData.filter((item) => item.targetPostId === a.id).length;
    const bLikes = likesData.filter((item) => item.targetPostId === b.id).length;
    return bLikes - aLikes;
  });

  const sortedByLikeStatedPosts = sortedByLikePosts.filter(
    (post) =>
      post.markerPosition.lat > position.swLat &&
      post.markerPosition.lat < position.neLat &&
      post.markerPosition.lng > position.swLng &&
      post.markerPosition.lng < position.neLng
  );

  const sortedByLikeFilteredPosts = sortedByLikeStatedPosts.filter((post) => post.category === `${option}`);

  const onPostClick = (post) => {
    navigate(`/detail/${post.id}`);
  };

  return (
    <div>
      <button style={{ height: '70%', fontSize: '50%', marginLeft: '10px' }} onClick={() => setSortByLike(true)}>
        좋아요순
      </button>
      <button style={{ height: '70%', fontSize: '50%', marginLeft: '10px' }} onClick={() => setSortByLike(false)}>
        최신순
      </button>
      <StPostContainer>
        {sortByLike
          ? (option ? sortedByLikeFilteredPosts : sortedByLikeStatedPosts).map((post, index) => {
              //
              const eachLikesData = likesData.filter((item) => item.targetPostId === post.id);
              const truncatedTitle =
                post.postTitle.length > 5 ? post.postTitle.substring(0, 5) + '...' : post.postTitle;
              const truncatedBody =
                stripHtmlTags(post.postBody).length > 10
                  ? stripHtmlTags(post.postBody).substring(0, 10) + '...'
                  : stripHtmlTags(post.postBody);
              //
              return (
                <StPostList key={index}>
                  <div style={{ flex: 1 }}>
                    <ul>
                      <li style={{ marginLeft: '20px' }}>{post.category}</li>
                      <br />
                      <li style={{ fontWeight: 'bold' }}>{truncatedTitle}</li>
                      <br />
                      <li>{truncatedBody}</li>
                      <br />
                      <div>
                        <button onClick={() => onPostClick(post)} style={{ cursor: 'pointer' }}>
                          상세보기
                        </button>
                      </div>
                    </ul>
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {post.postImg && (
                        <img
                          src={post.postImg}
                          alt="Post Image"
                          style={{ width: '80px', height: '80px', marginBottom: '30px' }}
                        />
                      )}
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <i className="fa-solid fa-thumbs-up">{eachLikesData.length}</i>
                      </div>
                    </div>
                  </div>
                </StPostList>
              );
            })
          : (option ? filteredPosts : statedPosts).map((post, index) => {
              //
              const eachLikesData = likesData.filter((item) => item.targetPostId === post.id);
              const truncatedTitle =
                post.postTitle.length > 5 ? post.postTitle.substring(0, 5) + '...' : post.postTitle;
              const truncatedBody =
                stripHtmlTags(post.postBody).length > 10
                  ? stripHtmlTags(post.postBody).substring(0, 10) + '...'
                  : stripHtmlTags(post.postBody);
              //
              return (
                <StPostList key={index}>
                  <div style={{ flex: 1 }}>
                    <ul>
                      <li style={{ marginLeft: '20px' }}>{post.category}</li>
                      <br />
                      <li style={{ fontWeight: 'bold' }}>{truncatedTitle}</li>
                      <br />
                      <li>{truncatedBody}</li>
                      <br />
                      <div>
                        <button onClick={() => onPostClick(post)} style={{ cursor: 'pointer' }}>
                          상세보기
                        </button>
                      </div>
                    </ul>
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {post.postImg && (
                        <img
                          src={post.postImg}
                          alt="Post Image"
                          style={{ width: '80px', height: '80px', marginBottom: '30px' }}
                        />
                      )}
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <i className="fa-solid fa-thumbs-up">{eachLikesData.length}</i>
                      </div>
                    </div>
                  </div>
                </StPostList>
              );
            })}
      </StPostContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>{scrollLoading && <Loader />}</div>
    </div>
  );
};

export default PostListMain;

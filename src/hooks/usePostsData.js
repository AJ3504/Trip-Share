// import { collection, query, where } from 'firebase/firestore';
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { db } from '../service/firebase';

// const usePostsData = () => {
//   // fetch data
//   const { postsData, isLoading, isError, error } = useSelector((state) => state.postsSlice);

//   // 'likes' 컬렉션
//   const likesRef = collection(db, 'likes');
//   const likesDoc = postsData ? query(likesRef, where('targetPostId', '==', targetPost?.id)) : null;

//   // GET
//   const getLikes = async () => {
//     if (targetPost) {
//       const data = await getDocs(likesDoc);
//       const spreadData = data.docs.map((doc) => ({ ...doc.data(), likeDocId: doc.id }));
//       // console.log('좋아요수만큼', spreadData);
//       const hasUserLiked = spreadData.filter((doc) => doc.userId === user?.uid);
//       // console.log('그중에서 로그인id랑 같은 것', hasUserLiked);

//       setLikeAmount(data.docs.length); //문서개수만큼 상태관리 업데이트
//       setLiked(hasUserLiked.length > 0);
//     }
//   };

//   // ADD
//   const addLike = async () => {
//     if (targetPost && !liked) {
//       await addDoc(likesRef, { userId: user?.uid, postId: postsData.id, targetPostId: targetPost.id });

//       setLikeAmount((prev) => prev + 1);
//       setLiked(true);
//     }
//   };

//   // REMOVE

//   // UPDATE

//   return <div></div>;
// };

// export default usePostsData;

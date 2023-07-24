import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../service/firebase';
import { useParams } from 'react-router-dom';

const Like = () => {
  // 상단 hooks
  const [user] = useAuthState(auth);
  const [likeAmount, setLikeAmount] = useState(null);
  const { postId } = useParams();

  // fetch data
  const { postsData, isLoading, isError, error } = useSelector((state) => state.postsSlice);
  const targetPost = postsData.find((item) => item.id === postId);
  // if (isLoading) {
  //   return <h1>아직 로딩 중입니다</h1>;
  // }
  // if (isError) {
  //   return <h1>오류가 발생했어요</h1>;
  // }

  // 'likes' 컬렉션
  const likesRef = collection(db, 'likes');

  const likesDoc = query(likesRef, where('targetPostId', '==', targetPost?.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikeAmount(data.docs.length);
  };

  // const getLikes = async () => {
  //   const data = await getDocs(likesRef);
  //   // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //여기서의 id는: 유저가 누른 like만큼 likesRef에 올라간 문서의 id
  //   setLikeAmount(data.docs.length);
  // };

  const addLike = async () => {
    await addDoc(likesRef, { userId: user?.uid, targetPostId: targetPost.id });
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <i class="fa-solid fa-thumbs-up" onClick={addLike}>
      공감{likeAmount}
    </i>
  );
};

export default Like;

// const Like = () => {
//   //useStates
//   const [like, setLike] = useState(0);
//   const [isLike, setIsLike] = useState(false);
//   const [disLike, setDisLike] = useState(0);
//   const [isDisLike, setIsDisLike] = useState(false);

//   //Event Handler
//   const onLikeButtonClick = () => {
//     setLike(like + (isLike ? -1 : 1));
//     setIsLike(!isLike);
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       <i class="fa-solid fa-thumbs-up" onClick={onLikeButtonClick} style={{ border: 'solid', marginRight: '10px' }}>
//         공감{like}
//       </i>

//       {/* --------------------------------------------------------------------- */}
//       <i class="fa-solid fa-comment" style={{ fontSize: '15px', border: 'solid' }}>
//         댓글
//       </i>
//     </div>
//   );
// };

// export default Like;

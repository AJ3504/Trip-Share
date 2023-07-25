import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../service/firebase';
import { useParams } from 'react-router-dom';

const Like = () => {
  // 상단 hooks
  const [user] = useAuthState(auth);
  const [likeAmount, setLikeAmount] = useState(null);
  const [liked, setLiked] = useState([]);
  const { postId } = useParams();

  // fetch data
  const { postsData, isLoading, isError, error } = useSelector((state) => state.postsSlice);
  const targetPost = postsData.find((item) => item.id === postId);

  // 'likes' 컬렉션
  const likesRef = collection(db, 'likes');
  const likesDoc = query(likesRef, where('targetPostId', '==', targetPost?.id));

  // GET
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    const spreadData = data.docs.map((doc) => ({ ...doc.data(), likeDocId: doc.id }));
    // console.log('좋아요수만큼', spreadData);
    const hasUserLiked = spreadData.filter((doc) => doc.userId === user?.uid);
    // console.log('그중에서 로그인id랑 같은 것', hasUserLiked);

    //-------------------------------------------------------------------------------------------------------------------
    // const hasUserLiked = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // const hasUserLiked = data.docs.find((doc) => doc.userId === user?.uid && doc.targetPostId === targetPost?.id);
    // const data2 = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })); //[{..}, {...}] 배열 형태로 문서 데이터 가져온 후

    // const hasUserLiked = data2.docs.find((item) => item.userId === user?.uid);
    // console.log(hasUserLiked);
    //-------------------------------------------------------------------------------------------------------------------

    setLikeAmount(data.docs.length); //문서개수만큼 상태관리 업데이트
    setLiked(hasUserLiked);
  };

  // ADD
  const addLike = async () => {
    if (liked.length === 0) {
      await addDoc(likesRef, { userId: user?.uid, targetPostId: targetPost.id });

      setLikeAmount((prev) => prev + 1);
    }
  };

  // REMOVE
  const removeLike = async () => {
    if (liked.length > 0) {
      const wouldDeleteQuery = query(
        likesRef,
        where('targetPostId', '==', targetPost?.id),
        where('userId', '==', user?.uid)
      );
      const wouldDeleteData = await getDocs(wouldDeleteQuery);
      const wouldDelete = doc(db, 'likes', wouldDeleteData?.docs[0].id);

      await deleteDoc(wouldDelete);
      setLikeAmount((prev) => prev - 1);
    }
  };

  //
  // const hasUserLiked = data2.find((item) => item.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    // <div>
    //   {/* <i class="fa-solid fa-thumbs-up" onClick={addLike}>
    //     공감{likeAmount}
    //   </i> */}
    //   {/* <i class="fa-solid fa-thumbs-down" onClick={removeLike}>
    //     별로{likeAmount}
    //   </i> */}
    // </div>

    <i class="fa-solid fa-thumbs-up" onClick={liked.length > 0 ? removeLike : addLike}>
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

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
  const [liked, setLiked] = useState(false);
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

    // 한번만 로직 추가

    setLikeAmount(data.docs.length); //문서개수만큼 상태관리 업데이트
    setLiked(hasUserLiked.length > 0);
  };

  // ADD
  const addLike = async () => {
    if (!liked) {
      await addDoc(likesRef, { userId: user?.uid, targetPostId: targetPost.id });

      setLikeAmount((prev) => prev + 1);
      setLiked(true);
    }
  };

  // REMOVE
  const removeLike = async () => {
    if (liked) {
      const wouldDeleteQuery = query(
        likesRef,
        where('targetPostId', '==', targetPost?.id),
        where('userId', '==', user?.uid)
      );
      const wouldDeleteData = await getDocs(wouldDeleteQuery);
      const wouldDelete = doc(db, 'likes', wouldDeleteData?.docs[0].id);

      await deleteDoc(wouldDelete);
      setLikeAmount((prev) => prev - 1);
      setLiked(false);
    }
  };

  //
  useEffect(() => {
    getLikes();
  }, []);

  return (
    <i class="fa-solid fa-thumbs-up" onClick={liked ? removeLike : addLike}>
      공감{likeAmount}
    </i>
  );
};

export default Like;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../service/firebase';
import { useParams } from 'react-router-dom';
import { setLikeAmount, setLiked } from '../../redux/modules/likeSlice';

const Like = () => {
  // 상단 hooks
  const [user] = useAuthState(auth);
  const { likeAmount, liked } = useSelector((state) => state.likeSlice);
  const { postId } = useParams();
  const dispatch = useDispatch();

  // fetch data
  const { postsData, isLoading, isError, error } = useSelector((state) => state.postsSlice);
  const targetPost = postsData.find((item) => item.id === postId);

  // 'likes' 컬렉션
  const likesRef = collection(db, 'likes');
  const likesDoc = targetPost ? query(likesRef, where('targetPostId', '==', targetPost?.id)) : null;

  // GET
  const getLikes = async () => {
    if (targetPost) {
      const data = await getDocs(likesDoc);
      const spreadData = data.docs.map((doc) => ({ ...doc.data(), likeDocId: doc.id }));
      // console.log('좋아요수만큼', spreadData);
      const hasUserLiked = spreadData.filter((doc) => doc.userId === user?.uid);
      // console.log('그중에서 로그인id랑 같은 것', hasUserLiked);

      dispatch(setLikeAmount(data.docs.length)); //문서개수만큼 상태관리 업데이트
      dispatch(setLiked(hasUserLiked.length > 0));
    }
  };

  // ADD
  const addLike = async () => {
    if (targetPost && !liked) {
      await addDoc(likesRef, { userId: user?.uid, targetPostId: targetPost.id });
    }
  };

  // REMOVE
  const removeLike = async () => {
    if (targetPost && liked) {
      const wouldDeleteQuery = query(
        likesRef,
        where('targetPostId', '==', targetPost?.id),
        where('userId', '==', user?.uid)
      );
      const wouldDeleteData = await getDocs(wouldDeleteQuery);
      const wouldDelete = doc(db, 'likes', wouldDeleteData?.docs[0].id);

      await deleteDoc(wouldDelete);
    }
  };

  //
  useEffect(() => {
    getLikes();
  }, []);

  const handleLikeClick = () => {
    if (liked) {
      removeLike();
      dispatch(setLikeAmount(likeAmount - 1));
      dispatch(setLiked(false));
    } else {
      addLike();
      dispatch(setLikeAmount(likeAmount + 1));
      dispatch(setLiked(true));
    }
  };

  return (
    <i className="fa-solid fa-thumbs-up" onClick={handleLikeClick}>
      공감{likeAmount}
    </i>
  );
};

export default Like;

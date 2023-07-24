import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Like = () => {
  // //hooks
  // const dispatch = useDispatch();

  // //functions
  // const addLike = async (postId) => {
  //   try {
  //     const res = await axios.put(`/api/posts/like/${postId}`);
  //     dispatch({
  //       type: UPDATE_LIKES,
  //       paylaod: { id, likes: res.data }
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: POST_ERROR,
  //       payload: { msg: err.response.statusText, status: err.response.status }
  //     });
  //   }
  // };
  // const removeLike = async (postId) => {
  //   try {
  //     const res = await axios.put(`/api/posts/unlike/${postId}`);
  //     dispatch({
  //       type: UPDATE_LIKES,
  //       paylaod: { id, likes: res.data }
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: POST_ERROR,
  //       payload: { msg: err.response.statusText, status: err.response.status }
  //     });
  //   }
  // };

  return (
    <div>
      <span>
        <i class="fa-solid fa-thumbs-up"></i>
      </span>
    </div>
  );
};

export default Like;

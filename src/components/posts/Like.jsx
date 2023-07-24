import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Like = () => {
  //useStates
  const [like, setLike] = useState(456);
  const [isLike, setIsLike] = useState(false);

  //Event Handler
  const onLikeButtonClick = () => {
    setLike(like + (isLike ? -1 : 1));
    setIsLike(!isLike);
  };

  return (
    <div style={{ display: 'flex' }}>
      <i class="fa-solid fa-thumbs-up" onClick={onLikeButtonClick} style={{ border: 'solid', marginRight: '10px' }}>
        공감{like}
      </i>
      <i class="fa-solid fa-comment" style={{ fontSize: '15px', border: 'solid' }}>
        댓글
      </i>
    </div>
  );
};

export default Like;

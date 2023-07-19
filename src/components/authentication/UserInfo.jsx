import React, { useRef } from 'react';

const UserInfo = () => {
  // useRef를 이용하여 input태그에 접근
  const imageFileInput = useRef();

  // 이미지 업로드 버튼 클릭 시 이미지 파일 인풋 태그에 클릭 이벤트 걸기
  const onClickImageFile = () => {
    imageFileInput.current.click();
  };

  return (
    <>
      <div>
        <div>
          <image alt="profile" />
        </div>
        <div>
          <input type="file" ref={imageFileInput} />
          <button onClick={onClickImageFile}>프로필 사진 변경</button>
        </div>
      </div>

      <form>
        <div>
          <p>EMAIL</p>
          <input type="email" disabled={true} />

          <p>NICKNAME</p>
          <input type="text" maxLength={10} />
          <button type="submit">프로필 정보 변경</button>
        </div>
      </form>
    </>
  );
};

export default UserInfo;

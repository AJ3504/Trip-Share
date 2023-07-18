import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../service/firebase';

const SingUp = () => {
  const [singupEmail, setSingupEmail] = useState('');
  const [singupPassword, setSingupPassword] = useState('');

  const onclickSingup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, singupEmail, singupPassword);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <input
        placeholder="이메일 주소를 입력해주세요"
        onChange={(e) => {
          setSingupEmail(e.target.value);
        }}
      />
      <input
        placeholder="비밀번호를 입력해주세요"
        onChange={(e) => {
          setSingupPassword(e.target.value);
        }}
      />
      <button onClick={onclickSingup}>회원가입</button>
    </div>
  );
};
export default SingUp;

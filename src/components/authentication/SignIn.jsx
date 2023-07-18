import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../service/firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate('/');
      setUserData(result.user);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGithubSignIn = async () => {
    const provider = new GithubAuthProvider(); // provider 깃허브 설정

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate('/');
      setUserData(result.user);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>소셜 로그인 테스트</h3>
      <button onClick={handleGoogleLogin}>Google</button>
      <button onClick={handleGithubSignIn}>Github</button>
      <div>{userData ? '당신의 이름은 : ' + userData.displayName : '로그인 버튼을 눌러주세요 :)'}</div>
    </div>
  );
};

export default SignIn;

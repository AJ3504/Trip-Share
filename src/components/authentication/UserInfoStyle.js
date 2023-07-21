import { styled } from 'styled-components';

export const St = {
  wholeContainer: styled.div`
    margin: 0 auto 80px;
    padding-top: 30px;
    display: flex;
  `,

  ProfileContainer: styled.div`
    position: relative;
    width: 150px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    text-align: center;
  `,

  ProfileWarp: styled.div`
    margin: 0 auto;
    padding-left: 20px;
  `,

  ProfileImageBox: styled.div`
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 100%;
  `,

  ProfileImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,
  ProfileEditBtn: styled.div`
    margin-top: 20px;
    text-align: right;
    font-size: 25px;
  `,
  Nickname: styled.p`
    margin-top: 20px;
    font-size: 20px;
  `,

  // 이안진 내가쓴글 영역 css 추가
  MyPostContainer: styled.div`
    position: relative;
    left: 150px;
    height: 100vh;
    width: 100vh;
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: gray;
  `
};

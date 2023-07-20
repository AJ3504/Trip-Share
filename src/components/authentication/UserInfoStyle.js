import { styled } from 'styled-components';

export const St = {
  ProfileContainer: styled.div`
    position: relative;
    width: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    text-align: center;
  `,

  ProfileWarp: styled.div`
    margin: 0 auto;
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
    margin-top: 10px;
    text-align: right;
  `,
  Nickname: styled.p`
    margin-top: 20px;
    font-size: 20px;
  `
};

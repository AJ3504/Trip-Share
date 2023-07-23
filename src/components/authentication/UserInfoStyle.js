import { styled } from 'styled-components';

export const St = {
  WholeContainer: styled.div`
    margin: 0 auto 80px;
    padding-top: 30px;
    display: flex;
  `,

  ProfileContainer: styled.div`
    position: relative;
    width: 230px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    text-align: center;
  `,

  ProfileWarp: styled.div`
    margin: 0 auto;
    padding-left: 2.5rem;
    position: fixed;
    z-index: 999;
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
    image-rendering: -webkit-optimize-contrast !important ;
  `,
  ProfileEditBtn: styled.div`
    margin-top: 20px;
    text-align: right;
    font-size: 25px;
    cursor: pointer;
  `,
  Nickname: styled.p`
    margin-top: 20px;
    font-size: 18px;
  `
};

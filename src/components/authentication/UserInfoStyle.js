import { styled } from 'styled-components';

export const St = {
  ProfileContainer: styled.div`
    position: relative;
    outline: 2px solid black;
    width: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
  `
};

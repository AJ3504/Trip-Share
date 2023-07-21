import { styled } from 'styled-components';

export const St = {
  Footer: styled.footer`
    width: 100vw;
    height: 40px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    background-color: beige;

    .github {
      cursor: pointer;
    }
  `,
  P: styled.p`
    margin-right: 5px;
    margin-top: 5px;
    display: flex;
    align-items: center;
  `
};

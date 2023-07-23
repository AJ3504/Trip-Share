import { styled } from 'styled-components';

export const St = {
  Footer: styled.footer`
    bottom: 0;
    width: 100%;
    /* height: 100%; */
    display: flex;
    position: relative;
    align-items: center;
    z-index: 999;
    background-color: rgba(0, 194, 255, 0.7);

    .github {
      cursor: pointer;
    }
  `,
  P: styled.p`
    margin: 10px;
    font-size: 13px;
    display: flex;
    align-items: center;
  `
};

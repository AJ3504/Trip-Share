import { styled } from 'styled-components';

export const St = {
  Footer: styled.footer`
    bottom: 0;
    width: 100%;
    height: 40px;
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
    margin: 5px 5px 0 12px;
    display: flex;
    align-items: center;
  `
};

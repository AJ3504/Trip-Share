import { styled } from 'styled-components';

export const St = {
  Footer: styled.footer`
    bottom: 0;
    width: 100%;
    height: 40px;
    display: flex;
    position: fixed;
    padding-left: 15px;
    align-items: center;
    background-color: rgba(0, 194, 255, 0.7);

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

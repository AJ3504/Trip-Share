import { styled } from 'styled-components';

export const St = {
  Btn: styled.button`
    border: none;
    font-size: 15px;
    cursor: pointer;
    background-color: transparent;
  `,

  ModalBox: styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
  `,

  ModalContents: styled.div`
    padding: 20px;
    border-radius: 12px;
    background-color: #fff;
  `,

  SignUPWrap: styled.div`
    padding: 2.5rem;
  `,

  SignUp: styled.p`
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
  `,

  SignUpTitle: styled.p`
    font-size: 12px;
    margin-bottom: 10px;
  `,

  Input: styled.input`
    width: 240px;
    height: 30px;
    border: none;
    outline: none;
    display: flex;
    border-radius: 5px;
    padding-left: 15px;
    margin-bottom: 10px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: rgb(232, 240, 254);
  `,

  SignUpBtn: styled.button`
    width: 257px;
    height: 30px;
    border: none;
    outline: none;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: rgb(255, 255, 205);
  `
};

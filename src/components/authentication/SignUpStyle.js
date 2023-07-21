import { styled } from 'styled-components';

export const St = {
  Btn: styled.button`
    border: none;
    cursor: pointer;
    background-color: transparent;
  `,

  ModalBox: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  `,

  ModalContents: styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
  `,

  SignUPWrap: styled.div`
    padding: 2.5rem;
  `,

  SignUp: styled.p`
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 10px;
  `,

  SignUpTitle: styled.p`
    font-size: 12px;
    margin-bottom: 10px;
  `,

  Input: styled.input`
    width: 230px;
    height: 30px;
    outline: none;
    padding-left: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  SignUpBtn: styled.button`
    width: 245px;
    height: 30px;
    cursor: pointer;
    outline: none;
    margin-top: 5px;
    margin-bottom: 10px;
  `
};

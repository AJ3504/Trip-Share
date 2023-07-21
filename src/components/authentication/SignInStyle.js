import { styled } from 'styled-components';

export const St = {
  Btn: styled.button`
    border: none;
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

  LoginWrap: styled.div`
    padding: 2.5rem;
  `,

  Login: styled.p`
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;
  `,

  LoginTitle: styled.p`
    font-size: 12px;
    margin-bottom: 10px;
  `,

  Input: styled.input`
    width: 200px;
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

  LoginBtn: styled.button`
    width: 216px;
    height: 30px;
    border: none;
    outline: none;
    cursor: pointer;
    margin-top: 5px;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: rgb(255, 255, 205);
  `,

  SocialLoginWarp: styled.div`
    gap: 5px;
    display: flex;
    flex-direction: row;
  `,

  SocialLoginBtn: styled.button`
    width: 105px;
    height: 30px;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgb(255, 230, 205);
  `
};

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

  LoginWrap: styled.div`
    padding: 2.5rem;
  `,

  Login: styled.p`
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 10px;
  `,

  LoginTitle: styled.p`
    font-size: 12px;
    margin-bottom: 10px;
  `,

  Input: styled.input`
    width: 200px;
    height: 30px;
    outline: none;
    padding-left: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  LoginBtn: styled.button`
    width: 216px;
    height: 30px;
    outline: none;
    cursor: pointer;
    margin-top: 5px;
    margin-bottom: 10px;
  `,

  SocialLoginWarp: styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
  `,

  SocialLoginBtn: styled.button`
    width: 105px;
    height: 30px;
    outline: none;
    cursor: pointer;
  `
};

import { styled } from 'styled-components';

export const St = {
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
  `,

  ModalContents: styled.div`
    background-color: #fff;
    width: 600px;
    padding: 20px;
    border-radius: 12px;
  `,

  Btn: styled.button`
    border: none;
    cursor: pointer;
    border-radius: 8px;
    background-color: #fab1a0;
    height: 40px;
    width: 120px;
  `,

  ProfileContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
  `,

  ProfileImageWrap: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ProfileImageBox: styled.div`
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 100%;
    margin: 30px;
  `,

  ProfileImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,

  ImageUploadBox: styled.div`
    margin-bottom: 15px;
  `,

  ImageInput: styled.input`
    display: none;
  `,

  ProfileBody: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  MemberInput: styled.input`
    width: 300px;
    height: 30px;
    padding-left: 15px;
    border: 0.03rem solid gray;
    border-radius: 5px;
    background-color: transparent;
    outline: none;
  `,
  MemberTextarea: styled.textarea`
    width: 296px;
    height: 40px;
    padding: 10px;
    border: 0.03rem solid gray;
    border-radius: 5px;
    background-color: transparent;
    outline: none;
  `,

  Contents: styled.div`
    display: flex;
    gap: 30px;
    margin: 10px;
  `,

  ContentsTitle: styled.button`
    cursor: pointer;
    margin-left: 15px;
    margin-bottom: 5px;
    border: none;
    background-color: transparent;
    font-size: 15px;
  `,

  contentsBody: styled.div`
    border-radius: 5px;
    margin-top: 15px;
    width: 100%;
    height: 100%;
  `,

  Btns: styled.button`
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background-color: #e4dccf;
  `
};

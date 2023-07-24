import { styled } from 'styled-components';

export const St = {
  WholeContainer: styled.div`
    background-color: rgb(236, 249, 255);
  `,
  // ------------------수정폼 모달 ------------------//
  EditModalContainer: styled.div`
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
  EditModalContents: styled.div`
    background-color: #fafafa;
    padding: 20px;
    width: 40%;
    height: 70%;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  EditModalInner: styled.div`
    width: 70%;
    margin: 0 auto;
    padding-top: 70px;
  `,
  EditForm: styled.form``,
  EditInputWrapper: styled.section`
    width: 91%;
    margin-top: 20px;
    margin-bottom: 60px;
  `,

  TitleLabel: styled.label`
    font-size: 14px;
    color: #555;
  `,
  EditInput: styled.input`
    width: 380px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
    &:hover {
      border-color: #888;
    }
    background-color: #f8f8f8;
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  `,
  BodyLabel: styled.label`
    font-size: 14px;
    color: #555;
  `,
  EditTextarea: styled.textarea`
    width: 100%;
    height: 150px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;

    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    &:hover {
      border-color: #888;
    }
    background-color: #f8f8f8;
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  `,

  // ------------------slect Area------------------ //
  DropdownWrapper: styled.div`
    width: 398px;
    position: relative;
    bottom: 20px;
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    &:hover {
      border-color: #888;
    }
    background-color: #f8f8f8;
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  `,

  DropdownHeader: styled.div`
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  `,

  DropdownList: styled.div`
    border-top: 1px solid #ccc;
    position: absolute;
    width: 200px;
    border: 1px solid #ccc;
    background-color: #ffffff;
  `,

  DropdownItem: styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: lightgray;
    }
  `,

  //  ------------------상세게시글 ------------------//
  DetailContainer: styled.div`
    margin-top: 5%;
    height: 100vh;
  `,

  DetailListsWrapper: styled.ul`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    text-align: center;
  `,

  DetailList: styled.li`
    border-radius: 7px;
    box-shadow: 5px 5px 10px #eee;
    display: inline-block;
    margin: 0 auto;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 25px;
    padding-bottom: 20px;
    background-color: #fafafa;
    overflow: auto;
    width: 1000px;
    height: 550px;
  `,

  // section className="writerInfo"
  WriterInfoSection: styled.section`
    width: 6%;
    padding: 8px;
  `,

  WriterInfoImageWrapper: styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  `,

  WriterInfoImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  `,

  WriterInfoNickName: styled.p`
    font-size: 13px;
    color: #a8b0c4da;
    padding-top: 5px;

    text-align: left;
    margin-left: 10px;
  `,

  // section className="content"
  ContentSection: styled.section`
    //
    display: flex;
    justify-content: space-between;
    //
    margin-top: 40px;
  `,

  Article: styled.div`
    position: relative;
    left: 10px;
    top: 10px;
    line-height: 1.5;
    text-align: justify;
    width: 55.5%;
    height: 30px;
  `,

  TitleLetter: styled.p`
    font-size: 18px;
    font-weight: 1000;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  `,

  Img: styled.div`
    position: relative;
    right: 20px;
    margin-left: 10px;
  `
};

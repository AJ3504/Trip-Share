import { styled } from 'styled-components';

export const St = {
  WholeContainer: styled.div`
    background-color: rgb(236, 249, 255);
  `,
  // ------수정폼 모달 ------//
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
  EditForm: styled.form`
    background-color: #fafafa;
    padding: 20px;
    width: 50%;
    height: 50%;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 999;
  `,
  TitleLabel: styled.label`
    font-size: 14px;
    color: #555;
  `,
  EditInput: styled.input`
    width: 100%;
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

  //------slect Area: ------ //
  DropdownWrapper: styled.div`
    width: 200px;
    position: relative;
    bottom: 20px;
    margin-bottom: 10px;
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

  // ------상세게시글 ------//
  DetailContainer: styled.div`
    position: relative;
    left: 50px;
    top: 50px;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    text-align: center;
  `,

  DetailListsWrapper: styled.ul``,

  DetailList: styled.li`
    display: flex;
    justify-content: space-between;
    border-radius: 7px;
    box-shadow: 5px 5px 10px #eee;
    margin: 15px;
    margin-right: 50px;
    padding: 30px;
    background-color: #fafafa;
    height: 200px;
  `,

  DetailBody: styled.div`
    position: relative;
    left: 10px;
    top: 10px;
    line-height: 1.5;
    text-align: justify;
    width: 500px;
    height: 30px;
  `,

  DetailButton: styled.button``,

  DetailImg: styled.div`
    position: relative;
    right: 20px;
    margin-left: 10px;
  `
};

//git push용 변경사항

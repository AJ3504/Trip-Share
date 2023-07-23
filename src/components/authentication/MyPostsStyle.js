import { styled } from 'styled-components';

export const St = {
  MyPostContainer: styled.div`
    position: relative;
    left: 230px;
    min-height: 100%;
    width: 100vw;
    display: flex;
    flex-direction: column;
    text-align: center;
  `,

  MyPostListsWrapper: styled.ul`
    border-radius: 7px;
    margin: 15px;
    margin-right: 50px;
    padding: 30px;
    width: 800px;
    background-color: #fafafa;
  `,

  MyPostList: styled.li`
    display: flex;
    justify-content: space-between;
  `,

  MyPostBody: styled.div`
    position: relative;
    left: 10px;
    top: 10px;
    line-height: 1.5;
    text-align: justify;
    overflow: hidden;
  `,

  MyPostImg: styled.div`
    position: relative;
    right: 20px;
  `
};

import styled from 'styled-components';

export const StMainBody = styled.div`
  display: flex;
`;

export const StLeftContainer = styled.div`
  width: 22%;
  height: 100%;
`;

export const StSearchInputContainer = styled.div`
  height: 4vh;
  padding: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StSearchInput = styled.input`
  width: 80%;
  height: 30px;
  margin: 10px;
  border-radius: 8px;

  text-align: center;
`;

export const StSearchResultContainer = styled.div`
  height: 96vh;
  overflow: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StSearchResultList = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  margin: 16px;
  border-radius: 10px;

  background-color: rgb(230, 241, 245);
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.18);
`;

export const StSearchImage = styled.img`
  width: 30%;
  height: 30%;
  object-fit: cover;
  border-radius: 10px 0 0 10px;
`;

export const StSearchInfo = styled.div`
  width: 70%;
  height: 100%;
  padding: 10px;

  display: flex;
  flex-direction: column;
`;

export const StSearchName = styled.div`
  font-size: 16px;
  font-weight: bold;

  margin: 0 0 10px 0;
`;

export const StSearchAddress = styled.div`
  font-size: 14px;

  margin: 0 0 8px 0;
`;

export const StSearchPhone = styled.div`
  font-size: 13px;
  font-style: oblique;
`;

export const StPlaceContainer = styled.div`
  height: 100%;
  align-items: center;
`;

export const StPlaceDetail = styled.div`
  display: flex;
`;

export const StIframeContainer = styled.div`
  width: 100%;
  height: 100vh;

  overflow: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StIframe = styled.iframe`
  width: 100%;
  height: 4200px;
`;

export const StButton = styled.button`
  cursor: pointer;
  background-color: transparent;
`;

export const StMapContainer = styled.div`
  width: 80%;
  height: 100vh;
`;

export const StMarkerContents = styled.div`
  height: 80px;
  padding: 8px;

  display: flex;
  flex-direction: column;
`;

export const StMarkerInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const StMarkerName = styled.div`
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: bold;
`;

export const StMarkerAddress = styled.div`
  font-size: 12px;
  /* white-space: nowrap; */
  display: flex;
`;

export const StRightContainer = styled.div`
  width: 20%;
  height: 100%;
`;

export const StMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

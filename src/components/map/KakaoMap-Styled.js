import styled from 'styled-components';

export const StMainBody = styled.div`
  display: flex;
`;

export const StLeftContainer = styled.div`
  width: 20%;
  height: 100%;
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

export const StSearchInputContainer = styled.div`
  height: 50px;
  padding: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StSearchInput = styled.input`
  width: 100%;
  height: 30px;
  margin: 10px;
  border-radius: 8px;

  text-align: center;
`;

export const StSearchResultContainer = styled.div`
  height: 100vh;
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
  width: 100%;
  height: 100%;
  padding: 14px;

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

  margin: 0 0 10px 0;
`;

export const StSearchPhone = styled.div`
  font-size: 14px;
  font-style: oblique;
`;

export const MarkerContentContainer = styled.div`
  background-color: transparent;

  width: 400px;
  background-color: wheat;
  text-align: center;
  align-items: center;
  display: flex;
`;

export const MarkerContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const MapContainer = styled.div`
  width: 60%;
  height: 874px;
`;

export const ContentWrapper = styled.div`
  background-color: transparent;
  padding: 20px;
`;

export const CategoryButton = styled.button`
  background-color: transparent;

  cursor: pointer;
`;

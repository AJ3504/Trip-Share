import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: transparent;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: yellowgreen;
  }
`;

export const Button2 = styled.button`
  padding: 10px 20px;
  margin-top: 300px;
  margin-right: 50px;
  width: 30px;
  height: 40px;
  font-size: 16px;
  background-color: transparent;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export const Li = styled.ul`
  padding: 18px;
  border: 1px solid yellowgreen;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  background-image: url('/배경.jpg');
  background-size: cover;
  background-position: center center;
`;

export const LeftContainer = styled.div`
  text-align: center;
  padding: 10px;
  flex: 1;
`;

export const SearchInput = styled.input`
  text-align: center;
  margin-right: 10px;
`;

export const DetailsContainer = styled.div`
  display: flex;
`;

export const DetailsContainer2 = styled.div`
  background-color: transparent;
  text-align: center;
  align-items: center;
  display: flex;
`;

export const ThumbnailImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px;
`;

export const MapContainer = styled.div`
  width: 60%;
  margin-right: 100px;
  margin-top: 200px;
  height: 600px;
`;

export const ContentWrapper = styled.div`
  background-color: transparent;
  padding: 20px;
`;

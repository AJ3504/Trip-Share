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

export const Li = styled.ul`
  padding: 18px;
  border: 1px solid yellowgreen;
  cursor: pointer;
`;

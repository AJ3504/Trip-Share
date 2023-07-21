import React from 'react';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';

const ArrowIcon = ({ isOpen }) => {
  return isOpen ? <BiSolidUpArrow /> : <BiSolidDownArrow />;
};

export default ArrowIcon;

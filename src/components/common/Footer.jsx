import React from 'react';
import { St } from './FooterStyle';
import { AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <St.Footer>
      <St.P>@ 125% outsourcing project 2023</St.P>
      <AiFillGithub className="github" size="25" onClick={() => window.open('https://github.com/AJ3504/5jo')} />
    </St.Footer>
  );
};

export default Footer;

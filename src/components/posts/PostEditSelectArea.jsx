import React, { useState } from 'react';
import { St } from '../../pages/DetailStyle';

const PostEditSelectArea = ({
  handleOptionClick,
  setEditSelectAreaIsOpen,
  editSelectedOption,
  editSelectAreaIsOpen,
  options
}) => {
  return (
    <div>
      <St.DropdownWrapper>
        <St.DropdownHeader
          onClick={() => {
            setEditSelectAreaIsOpen((prev) => !prev);
          }}
        >
          <span> {editSelectedOption || '선택해주세요!'} </span>
          <span>▼</span>
        </St.DropdownHeader>
        {editSelectAreaIsOpen && (
          <St.DropdownList>
            {options.map((option) => (
              <St.DropdownItem
                key={option}
                value={editSelectedOption}
                onClick={() => {
                  handleOptionClick(option);
                }}
              >
                {option}
              </St.DropdownItem>
            ))}
          </St.DropdownList>
        )}
      </St.DropdownWrapper>
    </div>
  );
};

export default PostEditSelectArea;

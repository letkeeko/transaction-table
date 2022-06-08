import React from "react";
import styled from "styled-components";
import { COLOR } from "../variables";
import Input from "../input";

const Wrapper = styled.div`
  position: relative;

  // magnifying glass
  &::before {
    content: "";
    background-color: ${COLOR.white};
    border: 2px solid ${COLOR.black};
    display: block;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    position: absolute;
    left: 11px;
    top: 11px;
    pointer-events: none;
  }

  &::after {
    content: "";
    background-color: ${COLOR.black};
    display: block;
    width: 2px;
    height: 6px;
    position: absolute;
    left: 22px;
    top: 22px;
    transform: rotate(-40deg);
    pointer-events: none;
  }

  .feedback {
    font-size: 0.8rem;
    position: absolute;
    left: 0;
    bottom: -20px;
  }
`;

const SearchBar = ({ searchTerm, handleInputChange, feedback }) => {
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Search records"
        value={searchTerm}
        feedback="Minimum"
        onChange={handleInputChange}
      />
      {!!feedback && <p className="feedback">{feedback}</p>}
    </Wrapper>
  );
};

export default SearchBar;

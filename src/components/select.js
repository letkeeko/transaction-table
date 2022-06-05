import React from "react";
import styled from "styled-components";
import { COLOR } from "./variables";

const Wrapper = styled.select`
  background-color: ${COLOR.black};
  color: ${COLOR.white};
  width: 100%;
  text-transform: uppercase;
  font-size: 0.7rem;
  text-align: center;
  border: 0;
  cursor: pointer;
  text-overflow: ellipsis;

  option {
    background-color: ${COLOR.white};
    color: ${COLOR.black};
    font-size: 0.8rem;
    text-transform: none;
  }
`;

// label -> default display value not the <label /> tag
const Select = ({ name, label, options, value, onChange }) => {
  return (
    <Wrapper name={name} value={value || ""} onChange={onChange}>
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </Wrapper>
  );
};

export default Select;

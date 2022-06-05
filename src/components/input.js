import React from "react";
import styled from "styled-components";
import { COLOR } from "./variables";

const Wrapper = styled.input`
  border: 1px solid ${COLOR.black};
  display: block;
  line-height: 30px;
  font-size: 1rem;
  padding: 4px 8px 4px 34px;
  width: ${({ w }) => w};
`;

// w -> width
const Input = ({ w, name, placeholder, type, value, onChange }) => {
  return (
    <Wrapper
      w={w || "220px"}
      name={name}
      type={type || "text"}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
    />
  );
};

export default Input;

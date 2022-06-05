import React from "react";
import styled from "styled-components";
import { COLOR } from "../components/variables";

const Wrapper = styled.button`
  background-color: ${COLOR.white};
  border: 1px solid ${COLOR.black};
  color: ${COLOR.black};
  margin: ${({ align }) => align};
  cursor: pointer;
  padding: 10px 20px;
  display: block;
  letter-spacing: 0.5px;
  transition: all 0.125s ease-in-out;

  &:hover {
    background-color: ${COLOR.black};
    color: ${COLOR.white};
  }
`;

// align -> margin
const Button = ({ children, onClick, align }) => {
  // use margin for alignment
  const getMarginValue = () => {
    if (align === "center") return "0 auto";

    if (align === "right") return "0 0 0 auto";

    // defaults to left
    return "0";
  };

  return (
    <Wrapper onClick={onClick} align={getMarginValue()}>
      {children}
    </Wrapper>
  );
};

export default Button;

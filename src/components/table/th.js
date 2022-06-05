// table data
import React from "react";
import styled from "styled-components";
import { COLOR } from "../variables";

const Wrapper = styled.th`
  background-color: ${COLOR.black};
  color: ${COLOR.white};
  padding: 11px 9px;
  font-size: 0.7rem;
  text-align: center;
  border: 1px solid rgba(51, 66, 87, 0.75);
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;

  &:first-child {
    border-left: none;
  }
`;

const Th = ({ children }) => {
  return (
    <Wrapper role="cell">{children || "No content element found"}</Wrapper>
  );
};

export default Th;

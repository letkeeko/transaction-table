// table row
import React from "react";
import styled from "styled-components";
import { COLOR } from "../variables";

const Wrapper = styled.tr`
  &:nth-child(even) {
    background-color: ${COLOR.grey};
  }
`;

const Tr = ({ children }) => {
  return <Wrapper role="row">{children || "No content element found"}</Wrapper>;
};

export default Tr;

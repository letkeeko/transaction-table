import React from "react";
import styled from "styled-components";

const Wrapper = styled.h1`
  text-align: ${({ align }) => align};
  margin-bottom: ${({ mb }) => mb};
  font-size: 1.7rem;
  font-weight: 700;
`;

// align -> text-align
// mb -> margin-bottom
export default function Title({ children, align, mb }) {
  return (
    <Wrapper align={align || "left"} mb={mb || 0}>
      {children || "No content element found"}
    </Wrapper>
  );
}

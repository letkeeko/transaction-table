// table data
import React from "react";
import styled from "styled-components";
import { COLOR } from "../variables";

const Wrapper = styled.td`
  color: ${COLOR.black};
  text-align: ${({ align }) => align};
  border: 1px solid rgba(51, 66, 87, 0.175);
  padding: 11px 15px;
  min-width: ${({ w }) => w};
  max-width: ${({ w }) => w};
  font-size: 0.825rem;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
`;

// align -> text-align
// w -> width
const Td = ({ children, title, align, w }) => {
  return (
    <Wrapper title={title} align={align || "left"} w={w || "160px"}>
      {children || "No content element found"}
    </Wrapper>
  );
};

export default Td;

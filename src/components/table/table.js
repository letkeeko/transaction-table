// table container
import React from "react";
import styled from "styled-components";

const Wrapper = styled.table`
  border: 1px solid rgba(51, 66, 87, 0.2);
`;

const Table = ({ children }) => {
  return <Wrapper>{children || "No content element found"}</Wrapper>;
};

export default Table;

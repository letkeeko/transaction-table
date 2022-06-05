import React from "react";
import styled from "styled-components";
import { COLOR } from "./variables";

const Wrapper = styled.div`
  background-color: ${({ bgColor }) => bgColor};
  margin-right: ${({ mr }) => mr};
  width: 23px;
  height: 23px;

  border-radius: 50%;
  position: relative;
  display: inline-block;
  vertical-align: middle;

  .symbol {
    color: ${({ color }) => color};
    font-size: 0.825rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.9;
  }
`;

// bgColor -> background-color
// mr -> margin-right
// color -> text color
// icon -> icon is just a text
const Symbol = ({ icon, color, bgColor, mr }) => {
  return (
    <Wrapper
      color={color || COLOR.white}
      bgColor={bgColor || COLOR.navy}
      mr={mr || 0}
    >
      <span className="symbol">{icon}</span>
    </Wrapper>
  );
};

export default Symbol;

import React from "react";
import styled from "styled-components";
import { COLOR } from "./variables";

const Wrapper = styled.input`
  cursor: pointer;
  opacity: ${({ readOnly }) => (readOnly ? 0.75 : 1)};
  pointer-events: ${({ readOnly }) => (readOnly ? "none" : "all")};
  accent-color: ${COLOR.navy};
`;

const Checkbox = ({ id, isChecked, isDisabled, onChange }) => {
  return (
    <Wrapper
      type="checkbox"
      data-id={id}
      data-ischecked={isChecked ? true : false}
      checked={isChecked ? true : false}
      readOnly={!id}
      onChange={onChange}
      disabled={isDisabled}
    ></Wrapper>
  );
};

export default Checkbox;

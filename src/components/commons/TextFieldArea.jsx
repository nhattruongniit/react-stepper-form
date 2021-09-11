import React, { forwardRef, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useClickAway } from 'react-use';

import LabelStyled from '../styled/LabelStyled';
import FormGroupStyled from '../styled/FormGroupStyled';

const TextFieldArea = forwardRef((props, ref) => {
  const [isFocus, setIsFocus] = useState(false);
  const textAreaRef = useRef(null);
  useClickAway(textAreaRef, () => {
    setIsFocus(false);
  });
  return (
    <FormGroupStyled className={props.className}>
      <LabelStyled htmlFor={props.name}>{props.label}</LabelStyled>
      <BoxStyled error={props.error} isFocus={isFocus} ref={textAreaRef}>
        <TextAreaStyled
          onFocus={() => setIsFocus(true)}
          ref={ref}
          placeholder={props.placeholder}
          height={props.height}
          {...props}
        />
      </BoxStyled>
    </FormGroupStyled>
  );
});

export default TextFieldArea;

TextFieldArea.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
};

TextFieldArea.defaultProps = {};

const BoxStyled = styled.div`
  padding: 10px 20px;
  display: block;
  width: 100%;
  height: ${(props) => props.height || '80px'};
  border: ${(props) => (props.isFocus ? '2px solid #d9d9d9' : '1px solid #d9d9d9')};
  border-radius: 5px;
  background: #ffffff 0% 0% no-repeat padding-box;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${(props) =>
    props.error &&
    css`
      border-color: #f44336;
    `}
`;

const TextAreaStyled = styled.textarea`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0;
  border-radius: 5px;
  opacity: 1;
  flex-grow: 1;
  height: 100%;
  outline: 0;
  resize: none;
  -webkit-resize: none;
  -moz-resize: none;
`;

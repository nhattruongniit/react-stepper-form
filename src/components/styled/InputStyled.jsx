import styled, { css } from 'styled-components';

const InputStyled = styled.input`
  padding: 15px 20px;
  display: block;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background: #ffffff 0% 0% no-repeat padding-box;
  font-size: 14px;
  line-height: 16px;
  height: 46px;
  box-sizing: border-box;
  background-color: transparent;
  color: #000000;
  &:focus {
    outline: none;
    border-width: 2px;
  }
  ${(props) =>
    props.error &&
    css`
      border-color: #f44336;
    `}
  ${(props) =>
    (props.disabled || props.readonly) &&
    css`
       {
        cursor: not-allowed;
        pointer-events: all;
      }
    `}
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export default InputStyled;

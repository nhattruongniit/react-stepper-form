import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import CurrencyInput from 'react-currency-input-field';

import LabelStyled from '../styled/LabelStyled';
import FormGroupStyled from '../styled/FormGroupStyled';

const TextFieldCurrency = forwardRef((props, ref) => {
  return (
    <FormGroupStyled className={props.className}>
      <LabelStyled htmlFor={props.name}>{props.label}</LabelStyled>
      <BoxStyled error={props.error}>
        <InputStyled type="tel" ref={ref} {...props} />
        <SymbolStyled>{props.symbol}</SymbolStyled>
      </BoxStyled>
    </FormGroupStyled>
  );
});

export default TextFieldCurrency;

TextFieldCurrency.propTypes = {
  name: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  error: PropTypes.string,
  symbol: PropTypes.string,
};

TextFieldCurrency.defaultProps = {
  symbol: '$',
};

const BoxStyled = styled.div`
  padding-right: 20px;
  padding-left: 20px;
  display: block;
  width: 100%;
  border: 1px solid #d9d9d9;
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

const InputStyled = styled(CurrencyInput)`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0;
  border-radius: 5px;
  opacity: 1;
  flex-grow: 1;
  margin-right: 10px;
  height: 42px;
  outline: 0;
`;

const SymbolStyled = styled.div`
  text-align: right;
  font: normal normal 600 14px/17px Helvetica Neue;
  letter-spacing: 0px;
  color: #3e3e3e;
  opacity: 1;
`;

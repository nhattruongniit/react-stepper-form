import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as CheckedSVG } from '../../assets/svg/checked.svg';

const Checkbox = forwardRef((props, ref) => {
  const { isCircle, defaultValue, label, ...otherProps } = props;
  return (
    <WrapperStyled>
      <CheckBoxStyled isCircle={isCircle}>
        {label}
        <input type="checkbox" ref={ref} {...otherProps} defaultChecked={defaultValue} />
        <span className="checkmark">
          <CheckedSVG fill="transparent" stroke="#ffff" />
        </span>
      </CheckBoxStyled>
    </WrapperStyled>
  );
});

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.bool,
  isCircle: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

Checkbox.defaultProps = {
  defaultValue: false,
  isCircle: false,
};

export default Checkbox;

const CheckBoxStyled = styled.label`
  font: normal normal 600 14px/17px Helvetica Neue;
  display: inline-block;
  position: relative;
  cursor: pointer;
  user-select: none;
  padding-left: 21px;
  font-size: 14px;
  color: #3e3e3e;
  & > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  & > .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    background: #fff;
    border: 2px solid #d9d9d9;
    border-radius: ${(props) => (props.isCircle ? '50%' : '3px')};
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover .checkmark {
    background: #ccc;
  }
  & > .checkmark {
    & svg {
      display: none;
    }
  }
  & input:checked ~ .checkmark {
    background: #5770c6;
    border: none;
    & svg {
      display: block;
    }
  }
  & input:checked ~ .checkmark:after {
    display: block;
  }
`;

const WrapperStyled = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
`;

import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ReactComponent as CheckedSVG } from '../../assets/svg/checked.svg';
import { useEffect } from 'react';
import LabelStyled from '../styled/LabelStyled';

const RadioInput = forwardRef((props, ref) => {
  const { error } = props;
  const options = useMemo(() => {
    return props.options || [];
  }, [props.options]);

  const isMultipleCol = useMemo(() => {
    return !!props.rowsPerCol;
  }, [props.rowsPerCol]);

  const rows = useMemo(() => {
    if (!isMultipleCol) return [];
    const rowsPerCol = +props.rowsPerCol;
    const data = [];
    let layer = 0;
    for (let i = 0; i < options.length; i++) {
      if (!data[layer]) {
        data[layer] = [];
      }
      data[layer].push(options[i]);
      if (data[layer].length >= rowsPerCol) {
        layer++;
      }
    }
    return data;
  }, [options, props.rowsPerCol, isMultipleCol]);

  useEffect(() => {
    if (typeof props.defaultValue === 'string') {
      const evt = new Event('change', { bubbles: true, cancelable: true });
      Object.defineProperty(evt, 'target', {
        writable: false,
        value: {
          value: props.defaultValue,
          name: props.name,
          type: 'radio',
        },
      });
      setTimeout(() => {
        props.onChange(evt);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperStyled className={props.className}>
      {!!props.label && <LabelStyled>{props.label}</LabelStyled>}
      <RadioGroupStyled gap={props.gap} vertical={props.vertical && !isMultipleCol}>
        {!!isMultipleCol &&
          rows.map((col, idxCol) => (
            <RadioColumnStyled key={idxCol}>
              {col.map((option, idx) => (
                <RadioStyled key={idx} color={props.color} circle={props.isCircle}>
                  {option.name}
                  <input
                    ref={ref}
                    type="radio"
                    name={props.name}
                    onChange={props.onChange}
                    value={option.value}
                    defaultChecked={option.value === props.defaultValue}
                  />
                  <span className="checkmark">
                    <CheckedSVG fill="transparent" stroke="#ffff" />
                  </span>
                </RadioStyled>
              ))}
            </RadioColumnStyled>
          ))}
        {!isMultipleCol &&
          options.map((option, idx) => (
            <RadioStyled key={idx} color={props.color} circle={props.isCircle}>
              {option.name}
              <input
                ref={ref}
                type="radio"
                name={props.name}
                onChange={props.onChange}
                value={option.value}
                defaultChecked={option.value === props.defaultValue}
              />
              <span className="checkmark">
                <CheckedSVG fill="transparent" stroke="#ffff" />
              </span>
            </RadioStyled>
          ))}
      </RadioGroupStyled>
    </WrapperStyled>
  );
});

RadioInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  gap: PropTypes.string, // distance between options
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  isCircle: PropTypes.bool,
  rowsPerCol: PropTypes.number,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

RadioInput.defaultProps = {
  isCircle: true,
};

export default RadioInput;

const RadioStyled = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding-left: 21px;
  font: normal normal 600 14px/17px Helvetica Neue;
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
    border-radius: 50%;
    border-radius: ${(props) => (props.circle ? '50%' : '3px')};
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
    background: ${(props) => props.color || '#a553d2'};
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
  flex-direction: column;
`;

const RadioColumnStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3px;
  &:not(:last-child) {
    margin-right: 35px;
  }

  & > * + * {
    margin-left: 0;
  }
  & > *:not(:last-child) {
    margin-bottom: ${(props) => (props.gap ? props.gap : '5px')};
  }
`;

const RadioGroupStyled = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  & > * + * {
    margin-left: ${(props) => (props.gap ? props.gap : '5px')};
  }
  ${(props) =>
    props.vertical &&
    css`
      flex-direction: column;
      margin-top: 3px;
      & > * + * {
        margin-left: 0;
      }
      & > *:not(:last-child) {
        margin-bottom: ${(props) => (props.gap ? props.gap : '5px')};
      }
    `}
`;

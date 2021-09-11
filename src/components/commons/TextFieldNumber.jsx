import React, { forwardRef, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// assets
import ArrowDownSvg from '../../assets/svg/arrow-down.svg';
import ArrowUpSvg from '../../assets/svg/arrow-up.svg';

import LabelStyled from '../styled/LabelStyled';
import FormGroupStyled from '../styled/FormGroupStyled';

const TextFieldNumber = forwardRef((props, ref) => {
  const { arrowleft, arrowright, className } = props;
  const [count, setCount] = useState(props.defaultValue || 0);
  const numberRef = useRef(props.defaultValue || 0);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    el.value = count;
    const evt = new Event('input', { bubbles: true });
    Object.defineProperty(evt, 'target', {
      writable: false,
      value: {
        value: count,
        name: props.name,
      },
    });
    props.onChange(evt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function decrement() {
    setCount((prevState) => (--prevState > 0 ? prevState : 0));
  }

  function increment() {
    setCount((prevState) => Number(prevState) + 1);
  }

  function onChange(e) {
    const { value } = e.target;
    setCount(value);
  }

  return (
    <FormGroupStyled className={className}>
      <LabelStyled htmlFor={props.name}>{props.label}</LabelStyled>
      <BoxStyled error={props.error}>
        <input
          type="hidden"
          ref={(el) => {
            ref.current = el;
            numberRef.current = el;
          }}
          {...props}
          onInput={props.onChange}
        />
        <InputStyled type="number" value={count} placeholder={props.placeholder} onChange={onChange} />
        <ArrowStyled className="textnumber__arrow">
          <ArrowActionStyled className="textnumber__left" onClick={decrement}>
            {!!arrowleft && arrowleft}
            {!arrowleft && <img src={ArrowDownSvg} alt="Arrow Down" />}
          </ArrowActionStyled>
          <DividerStyled className="textnumber__divider" />
          <ArrowActionStyled className="textnumber__right" onClick={increment}>
            {!!arrowright && arrowright}
            {!arrowright && <img src={ArrowUpSvg} alt="Arrow Up" />}
          </ArrowActionStyled>
        </ArrowStyled>
      </BoxStyled>
    </FormGroupStyled>
  );
});

export default TextFieldNumber;

TextFieldNumber.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.number,
  arrowleft: PropTypes.any,
  arrowright: PropTypes.any,
};

TextFieldNumber.defaultProps = {
  defaultValue: 0,
};

const BoxStyled = styled.div`
  position: relative;
  padding-right: 20px;
  padding-left: 20px;
  display: block;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background: #ffffff 0% 0% no-repeat padding-box;
  font-size: 14px;
  box-sizing: border-box;
  overflow: hidden;

  ${(props) =>
    props.error &&
    css`
      border-color: #f44336;
    `}
`;

const InputStyled = styled.input`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0;
  border-radius: 5px;
  opacity: 1;
  flex-grow: 1;
  height: 42px;
  width: 120%;
  outline: 0;
`;

const ArrowStyled = styled.div`
  background: rgba(238, 238, 238, 0.5) 0% 0% no-repeat padding-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 33px;
  position: absolute;
  right: 7px;
  top: 5px;
  width: 63px;
`;

const ArrowActionStyled = styled.div`
  padding: 0 10.5px;
  cursor: pointer;
  text-align: center;
  width: 50%;
  img {
    width: 10px;
  }
`;

const DividerStyled = styled.div`
  width: 1px;
  height: 18px;
  background: #d9d9d9 0% 0% no-repeat padding-box;
  border-radius: 1px;
  opacity: 1;
`;

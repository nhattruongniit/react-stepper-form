import React, { forwardRef, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Checkbox from './Checkbox';
import LabelStyled from '../styled/LabelStyled';

const CheckboxList = forwardRef((props, ref) => {
  const [checkedState, setCheckedState] = useState({});
  const [options, setOptions] = useState([]);
  const [force, setForce] = useState(new Date().getTime());
  const canDispatch = useRef(false);
  const inputRef = useRef();
  const valueRef = useRef([]);

  useEffect(() => {
    const optionMapping = options.reduce((acc, cur) => {
      acc[cur.value] = { ...cur };
      return acc;
    }, {});
    setCheckedState({ ...optionMapping });
  }, [options]);

  useEffect(() => {
    const value = Object.values(checkedState);
    valueRef.current = value;
    if (!canDispatch.current || !value.length) return;
    canDispatch.current = false;
    const evt = new Event('input', { bubbles: true, cancelable: true });
    Object.defineProperty(evt, 'target', {
      writable: false,
      value: {
        value: value,
        name: props.name,
      },
    });
    props.onChange(evt);
  }, [checkedState, props.name]);

  const handleChange = (e) => {
    canDispatch.current = true;
    const name = e.target.name;
    const checked = e.target.checked;
    setCheckedState((prev) => ({
      ...prev,
      [name]: { ...prev[name], checked },
    }));
  };

  useEffect(() => {
    if (props.values) {
      setOptions([...props.values]);
      canDispatch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!inputRef.current) return;
    // Overwrite setter, if react-form-hook set value. we can catch the value from it and do something
    Object.defineProperty(inputRef.current, 'value', {
      set(newValue) {
        setOptions(newValue);
        setForce(new Date().getTime());
      },
      get() {
        return valueRef.current;
      },
    });
  }, []);

  return (
    <WrapperStyled className={props.className}>
      <LabelStyled htmlFor={props.name}>{props.label}</LabelStyled>
      <input
        ref={(el) => {
          ref(el);
          inputRef.current = el;
        }}
        type="hidden"
      />
      <CheckBoxGroupStyled key={force} horizontal={props.horizontal}>
        {options.map((opt, index) => (
          <Checkbox
            isCircle={props.isCircle}
            key={index}
            label={opt.name}
            name={opt.value}
            onChange={handleChange}
            defaultValue={opt.checked}
          />
        ))}
      </CheckBoxGroupStyled>
    </WrapperStyled>
  );
});

CheckboxList.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  values: PropTypes.array,
  //
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

CheckboxList.defaultProps = {
  isCircle: true,
  horizontal: false,
  error: '',
  values: [],
};

export default CheckboxList;

const CheckBoxGroupStyled = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  flex-direction: column;
  --gap: 4px;
  ${(props) =>
    props.horizontal
      ? css`
          flex-direction: row;
          & > * + * {
            margin-left: var(--gap);
          }
        `
      : css`
          & > * + * {
            margin-top: var(--gap);
          }
        `};
`;

const WrapperStyled = styled.div`
  display: inline-flex;
  flex-direction: column;
  & > * + * {
    margin-top: 3px;
  }
`;

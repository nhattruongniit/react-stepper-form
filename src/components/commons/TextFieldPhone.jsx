import React, { forwardRef, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import TextFieldSelect from './TextFieldSelect';
import WrapperStyled from '../styled/FormGroupStyled';
import InputStyled from '../styled/InputStyled';
import PropTypes from 'prop-types';
import LabelStyled from '../styled/LabelStyled';

const regexPhoneNumber = /(^[+]\d+$)|(^\d+$)/;

const TextFieldPhone = forwardRef((props, ref) => {
  const { error, isDropdown = false, phoneNumber } = props;
  const inputRef = useRef(null);
  const phoneCodeRef = useRef(null);
  const prevPhoneNumber = useRef('');

  const listPostCode = {
    name: 'country-phone-code',
    label: props.label,
    options: [],
    placeholder: '',
    defaultValue: props.phoneCode || 'US',
    ref: (el) => (phoneCodeRef.current = el),
    onChange: handleCountryCodeChange,
    canInput: true,
  };

  function handleCountryCodeChange(e) {
    const phoneCode = !isDropdown ? '' : e.target.value;
    const phoneNumber = inputRef.current?.value;
    setPhoneNumber({
      phoneCode,
      phoneNumber,
    });
  }

  function handleInputChange(e) {
    const phoneCode = !isDropdown ? '' : phoneCodeRef.current.value;
    let phoneNumber = e.target.value || '';
    const isValid = regexPhoneNumber.test(phoneNumber) || phoneNumber === '' || phoneNumber === '+';
    if (isValid) {
      prevPhoneNumber.current = phoneNumber;
    } else {
      phoneNumber = prevPhoneNumber.current;
    }

    setPhoneNumber({
      phoneCode,
      phoneNumber,
    });
    inputRef.current.value = phoneNumber;
  }

  function setPhoneNumber(phoneNumberByCode) {
    const evt = new Event('input', { bubbles: true });
    Object.defineProperty(evt, 'target', {
      writable: false,
      value: {
        value: phoneNumberByCode,
        name: props.name,
      },
    });
    props.onChange(evt);
  }
  useEffect(() => {
    if (phoneNumber) {
      setPhoneNumber({
        phoneCode: '',
        phoneNumber,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumber]);
  return (
    <WrapperStyled>
      <FormGroupStyled error={error} isDropdown={isDropdown}>
        {!!isDropdown && <PhoneSelectBox {...listPostCode} />}
        {!isDropdown && props.label && <LabelStyled>{props.label}</LabelStyled>}
        <PhoneInputStyled
          ref={inputRef}
          onChange={handleInputChange}
          placeholder={props.placeholder}
          defaultValue={phoneNumber || ''}
          type="tel"
          isDropdown={isDropdown}
        />
        <HideInputStyled
          ref={(el) => {
            ref.current = el;
          }}
          {...props}
          defaultValue={phoneNumber}
        />
      </FormGroupStyled>
    </WrapperStyled>
  );
});

export default TextFieldPhone;

TextFieldPhone.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

TextFieldPhone.defaultProps = {
  placeholder: '',
  label: 'Phone',
  defaultValue: '',
  error: false,
  type: 'number',
};

const FormGroupStyled = styled(WrapperStyled)`
  margin-bottom: 0;
  ${(props) =>
    props.error &&
    css`
      .custom-select,
      input {
        border-color: #f44336;
      }
    `}

  ${(props) =>
    !!props.isDropdown &&
    css`
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-end;
      margin-bottom: 0;
    `}
`;

const PhoneInputStyled = styled(InputStyled)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
  margin-bottom: 0;
  ${(props) =>
    !!props.isDropdown &&
    css`
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `}
`;

const HideInputStyled = styled(InputStyled)`
  display: none;
`;

const PhoneSelectBox = styled(TextFieldSelect)`
  width: 110px;
  margin: 0;
  .custom-select-wrapper {
    width: fit-content !important;
  }
  .custom-select-wrapper .custom-select {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 11px;
  }
  .custom-select__trigger {
    /* justify-content: flex-start; */
    --padding-right: 12px;
    width: calc(100% + var(--padding-right));
    padding-left: 13px;
    padding-right: var(--padding-right);
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    .arrow {
      right: calc(var(--padding-right));
    }
  }
  .custom-select__trigger > span {
    padding-right: 23px;
  }
`;

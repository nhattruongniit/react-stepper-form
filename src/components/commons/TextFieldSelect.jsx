import React, { forwardRef, useMemo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useClickAway } from 'react-use';
import FormGroupStyled from '../styled/FormGroupStyled';
import { ReactComponent as ArrowDownSvg } from '../../assets/svg/arrow-down.svg';
import LabelStyled from '../styled/LabelStyled';

const TextFieldSelect = forwardRef((props, ref) => {
  const { options, error, defaultValue, placeholder, renderOption, canInput } = props;
  const [isOpen, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const selectRef = useRef(null);
  const inputRef = useRef(null);
  const valueRef = useRef(null);
  const [isFocus, setFocus] = useState(false);
  const canDispatch = useRef(false);

  useEffect(() => {
    valueRef.current = selected;
    if (!canDispatch.current) return;
    canDispatch.current = false;
    const evt = new Event('change', { bubbles: true, cancelable: true });
    Object.defineProperty(evt, 'target', {
      writable: false,
      value: {
        value: selected,
        name: props.name,
      },
    });
    props.onChange(evt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const optionMapping = useMemo(() => {
    return options.reduce((mapping, otp) => {
      mapping[otp.value] = otp;
      return mapping;
    }, {});
  }, [options]);

  const currentName = useMemo(() => {
    return optionMapping[selected]?.name || '';
  }, [optionMapping, selected]);

  useEffect(() => {
    setFilter(currentName);
  }, [optionMapping, selected, currentName, options]);

  const optionsFiltered = useMemo(() => {
    const isMatching = filter === currentName;
    if (currentName && isMatching) return options;
    return options.filter((otp) => (otp.name || '').toLowerCase().indexOf((filter || '').toLowerCase()) !== -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, options, currentName, filter]);

  const handleToggleOpen = () => {
    setFocus(true);

    if (!!filter) {
      setOpen(true);
      return;
    }
    setOpen((prev) => !prev);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleSelected = (newSelected) => () => {
    setSelected(newSelected);
    const newName = optionMapping[newSelected]?.name;
    setFilter(newName);
    canDispatch.current = true;
    setOpen(false);
  };

  const handleFilter = (el) => {
    const value = el.target.value;
    setFilter(value);
    setOpen(true);
    setFocus(true);
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      setSelected(defaultValue);
      canDispatch.current = true;
    }
  }, [defaultValue]);

  useClickAway(selectRef, () => {
    setOpen(false);
    setFocus(false);
    const isMatching = filter === currentName;
    if (isMatching) return;
    const otpFound = options.find((otp) => otp.name === filter);
    if (otpFound) {
      setSelected(otpFound.value);
    }
  });

  useEffect(() => {
    if (!inputRef.current) return;
    // Overwrite setter, if react-form-hook set value. we can catch the value from it and do something
    Object.defineProperty(inputRef.current, 'value', {
      set(newValue) {
        setSelected(newValue);
      },
      get() {
        return valueRef.current;
      },
    });
  }, []);

  return (
    <FormGroupStyled {...props}>
      <LabelStyled onClick={handleToggleOpen}>{props.label}</LabelStyled>
      <SelectboxStyled isOpen={isOpen} error={error}>
        <input
          ref={(el) => {
            ref(el);
            inputRef.current = el;
          }}
          type="hidden"
        />
        <div ref={selectRef} className="custom-select-wrapper">
          <div className={`custom-select ${isOpen && 'open'}`}>
            <label className="custom-select__trigger" {...(!canInput ? { onClick: handleToggleOpen } : {})}>
              <input
                className="custom-select__input"
                onFocus={handleFocus}
                onChange={handleFilter}
                onClick={handleToggleOpen}
                disabled={!canInput}
                value={filter}
              />
              {!filter && !isFocus && <span className="custom-select__placeholder">{placeholder || 'Select'}</span>}
              <ArrowIconStyled $isOpen={isOpen} className="arrow" />
            </label>
            <div className="custom-options">
              {optionsFiltered.map((item, index) => (
                <div key={index} onClick={handleSelected(item.value)} className="option-container">
                  <span className={`custom-option ${selected === item.value && 'selected'} `} data-value={item.value}>
                    {renderOption(item)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SelectboxStyled>
    </FormGroupStyled>
  );
});

TextFieldSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string]),
    }),
  ).isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  renderOption: PropTypes.func,
  canInput: PropTypes.bool,
};

TextFieldSelect.defaultProps = {
  placeholder: '',
  error: false,
  renderOption: (item) => item.name,
  canInput: false, // this option provide the option can input
};

export default TextFieldSelect;

const baseInputCss = css`
  padding: 7px 32px 7px 12px;
  border-radius: 8px;
  width: 100%;
  outline: none;
`;

const SelectboxStyled = styled.div`
  width: 100%;

  .html-select {
    display: none;
  }
  .custom-select-wrapper {
    position: relative;
    user-select: none;
    width: 100%;
    font: normal normal normal 14px/16px Helvetica Neue;
    font-size: 14px;
    color: #3e3e3e;
  }
  .custom-select {
    &__trigger {
      ${baseInputCss}
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      position: relative;
      cursor: pointer;
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
      &:focus {
        outline: none;
      }
      ${(props) =>
        props.error &&
        css`
          border-color: #f44336;
        `}
    }
    &__input {
      width: 100%;
      height: 100%;
      display: block;
      border: none;
      outline: none;
      text-align: left;
      font: normal normal normal 14px/16px Helvetica Neue;
      letter-spacing: 0px;
      color: #3e3e3e;
      opacity: 1;
      background: none;
    }
    &__placeholder {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #949494;
      font-size: 14px;
      font: normal normal normal 14px/16px Helvetica Neue;
    }
    &.open {
      & .custom-options {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        margin-top: 1px;
        box-shadow: -1px 1px 2px rgba(67, 70, 74, 0.0001), -2px 2px 5px rgba(67, 86, 100, 0.123689);
        border: 1px solid #d9d9d9;
        box-sizing: border-box;
        border-top: none;
      }
      & .custom-select__trigger {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  .custom-options {
    position: absolute;
    display: block;
    top: 100%;
    left: 0px;
    width: 100%;
    transition: all 0.5s;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 2;
    max-height: 200px;
    overflow-y: auto;
    background-color: #fff;
  }

  .custom-option {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.1s;
    color: #3e3e3e;
    font-size: 14px;
    font-family: 'Helvetica Neue';
    font-weight: 500;
    line-height: 17px;
    padding: 14px 0;
  }

  .option-container {
    padding: 0px 20px;
    border-bottom: 1px solid #d9d9d9;
    cursor: pointer;
    &:last-child .custom-option {
      border-bottom: none;
    }
  }

  .option-container:hover {
    .custom-option {
      cursor: pointer;
    }
    position: relative;
    &::after {
      content: '';
      position: absolute;
      display: block;
      width: calc(100%);
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.04);
    }
  }

  .custom-option.selected {
  }
`;
const ArrowIconStyled = styled(ArrowDownSvg)`
  width: 8px;
  height: 4px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  transition: all 0.5s;
  ${(props) =>
    props.isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

import React, { forwardRef, useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ReactComponent as CalenDarSVG } from '../../assets/svg/calendar_today_black_24dp.svg';
import LabelStyled from '../styled/LabelStyled';
import FormGroupStyled from '../styled/FormGroupStyled';

const DEFAULT_FORMAT = 'do LLL, yy';

const DatePicker = forwardRef((props, ref) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const inputRef = useRef();
  const canDispatch = useRef(false);
  const valueRef = useRef(null);

  useEffect(() => {
    valueRef.current = selectedDate;
    if (!canDispatch.current) return;
    canDispatch.current = false;
    const evt = new Event('input', { bubbles: true, cancelable: true });
    Object.defineProperty(evt, 'target', {
      writable: false,
      value: {
        value: selectedDate,
        name: props.name,
      },
    });
    props.onChange(evt);
  }, [selectedDate]);

  useEffect(() => {
    if (!inputRef.current) return;
    // Overwrite setter, if react-form-hook set value. we can catch the value from it and do something
    Object.defineProperty(inputRef.current, 'value', {
      set(newTime) {
        setSelectedDate(newTime);
      },
      get() {
        return valueRef.current;
      },
    });
  }, []);

  const handleChangeDate = (newTime) => {
    canDispatch.current = true;
    setSelectedDate(newTime);
  };

  const isEmpty = useMemo(() => {
    return selectedDate === null;
  }, [selectedDate]);

  useEffect(() => {
    if (props.defaultValue === undefined) return;
    setSelectedDate(props.defaultValue);
    canDispatch.current = true;
  }, []);

  return (
    <FormGroupStyled className={props.className}>
      {!!props.label && <LabelStyled>{props.label}</LabelStyled>}
      <input
        type="hidden"
        ref={(el) => {
          ref(el);
          inputRef.current = el;
        }}
        name={props.name}
      />
      <KeyboardDatePickerStyled
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        PopoverProps={{
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          transformOrigin: { horizontal: 'right', vertical: 'top' },
        }}
        value={selectedDate}
        onChange={handleChangeDate}
        fullWidth
        placeholder={props.placeholder}
        autoOk={false}
        keyboardIcon={<CalenDarSVG fill="#3e3e3e" width="11px" />}
        isEmpty={isEmpty}
        isError={!!props.error}
        format={props.format}
        {...props.keyboardDatePickerProps}
      />
    </FormGroupStyled>
  );
});

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  format: PropTypes.string, // Format time, we can ref format from date-fns
  keyboardDatePickerProps: PropTypes.object, // ref https://material-ui-pickers.dev/api/KeyboardDateTimePicker
};

DatePicker.defaultProps = {
  placeholder: '',
  keyboardDatePickerProps: {},
  format: DEFAULT_FORMAT,
};

export default DatePicker;

const KeyboardDatePickerStyled = styled(KeyboardDatePicker)`
  & .MuiInputBase-root {
    height: 46px;
    &:hover {
      border-color: red !important;
    }
  }
  & input {
    font: normal normal normal 14px/16px Helvetica Neue;
    color: #0b0b0b;
  }
  & .MuiOutlinedInput-root {
    & .MuiOutlinedInput-notchedOutline {
      border-color: #d9d9d9 !important;
    }
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #d9d9d9 !important;
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #d9d9d9 !important;
    }
  }
  & .MuiPickersToolbar-toolbar {
    background-color: red !important;
  }
  ${(props) =>
    props.isEmpty &&
    css`
      & input {
        color: #949494;
      }
    `}
  ${(props) =>
    !!props.isError &&
    css`
      & .MuiOutlinedInput-root {
        &:hover .MuiOutlinedInput-notchedOutline {
          border-color: #f44336 !important;
        }
        & .MuiOutlinedInput-notchedOutline {
          border-color: #f44336 !important;
        }
        &.Mui-focused .MuiOutlinedInput-notchedOutline {
          border-color: #f44336 !important;
        }
      }
    `}
`;

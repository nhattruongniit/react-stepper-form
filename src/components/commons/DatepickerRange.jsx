import React, { forwardRef, useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { KeyboardDatePicker, MuiPickersContext } from '@material-ui/pickers';
import { ReactComponent as CalenDarSVG } from '../../assets/svg/calendar_today_black_24dp.svg';
import LabelStyled from '../styled/LabelStyled';
import FormGroupStyled from '../styled/FormGroupStyled';
import { useStyles as useOriginalStyles } from '@material-ui/pickers/views/Calendar/Day';
import classNames from 'classnames';

const DEFAULT_FORMAT = 'do LLL, yy';
const CALENDAR_CLASS = 'DatePickerRange-calendar';

const DatePickerRange = forwardRef((props, ref) => {
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const inputRef = useRef();
  const valueRef = useRef([null, null]);

  const canDispatch = useRef(false);

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
        Array.isArray(newTime) && setSelectedDate(newTime);
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

  useEffect(() => {
    if (!Array.isArray(props.defaultValue)) return;
    setSelectedDate(selectedDate);
    canDispatch.current = true;
  }, [props.defaultValue]);

  return (
    <FormGroupStyled>
      {!!props.label && <LabelStyled>{props.label}</LabelStyled>}
      <input
        type="hidden"
        ref={(el) => {
          ref(el);
          inputRef.current = el;
        }}
        name={props.name}
      />
      <DateRangeExtension
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        fullWidth
        value={selectedDate}
        popoverProps={{
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          transformOrigin: { horizontal: 'right', vertical: 'top' },
        }}
        onChange={handleChangeDate}
        placeholder={props.placeholder}
        isError={props.error}
        autoOk={true}
        format={props.format}
      />
    </FormGroupStyled>
  );
});

const DateRangeExtension = ({
  value,
  onChange,
  labelFunc,
  format,
  emptyLabel,
  isEmpty,
  onClose,
  autoOk,
  popoverProps,
  ...props
}) => {
  const [begin, setBegin] = useState(null);
  const [end, setEnd] = useState(null);
  const [hover, setHover] = useState(undefined);
  const utils = useContext(MuiPickersContext);
  const originalClasses = useOriginalStyles();

  const min = Math.min(begin, end || hover);
  const max = Math.max(begin, end || hover);

  useEffect(() => {
    const [_begin, _end] = value;
    setBegin(_begin);
    setEnd(_end);
  }, [value]);

  function renderDay(day, selectedDate, dayInCurrentMonth, dayComponent) {
    return React.cloneElement(dayComponent, {
      onClick: (e) => {
        e.stopPropagation();
        if (!begin) setBegin(day);
        else if (!end) {
          setEnd(day);
          if (autoOk) {
            onChange([begin, day].sort());
            const dialog = document.querySelector(`.${CALENDAR_CLASS} div[aria-hidden="true"]`);
            dialog && dialog.click();
          }
        } else {
          setBegin(day);
          setEnd(undefined);
        }
      },
      onMouseEnter: (e) => setHover(day),
      className: classNames(originalClasses.day, 'DatePickerRange-day', {
        [originalClasses.hidden]: dayComponent.props.hidden,
        [originalClasses.current]: dayComponent.props.current,
        [originalClasses.dayDisabled]: dayComponent.props.disabled,
        [originalClasses.daySelected]:
          !!min && (utils.isSameDay(day, min) || utils.isSameDay(day, max) || (day >= min && day <= max)),
        'DatePickerRange-day-beginCap': !!min && utils.isSameDay(day, min),
        'DatePickerRange-day-endCap': !!min && utils.isSameDay(day, max),
      }),
    });
  }

  const formatDate = (date) => utils.format(date, format);

  return (
    <KeyboardDatePickerStyled
      {...props}
      isEmpty={isEmpty}
      autoOk={autoOk}
      value={begin}
      renderDay={renderDay}
      onChange={() => {}}
      onClose={() => {
        !autoOk && onChange([begin, end].sort());
        onClose && onClose();
      }}
      onClear={() => {
        setBegin(undefined);
        setEnd(undefined);
        setHover(undefined);
        onChange([]);
      }}
      keyboardIcon={<CalenDarSVG fill="#3e3e3e" width="11px" />}
      labelFunc={(date, invalid) =>
        labelFunc
          ? labelFunc([begin, end].sort(), invalid)
          : date && begin && end
          ? `${formatDate(begin)} - ${formatDate(end)}`
          : emptyLabel || ''
      }
      PopoverProps={{
        ...popoverProps,
        className: CALENDAR_CLASS,
      }}
      DialogProps={{
        className: CALENDAR_CLASS,
      }}
    />
  );
};

DatePickerRange.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  format: PropTypes.string, // Format time, we can ref format from date-fns
};

DatePickerRange.defaultProps = {
  placeholder: '',
  format: DEFAULT_FORMAT,
};

export default DatePickerRange;

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

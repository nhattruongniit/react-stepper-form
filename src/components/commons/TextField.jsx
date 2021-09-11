import React from 'react';
import PropTypes from 'prop-types';
import FormGroupStyled from '../styled/FormGroupStyled';
import LabelStyled from '../styled/LabelStyled';
import InputStyled from '../styled/InputStyled';

const TextField = React.forwardRef((props, ref) => (
  <FormGroupStyled className={props.className}>
    <LabelStyled htmlFor={props.name}>{props.label}</LabelStyled>
    <InputStyled id={props.name} ref={ref} disabled={!!props.disabled} readOnly={!!props.readonly} {...props}></InputStyled>
  </FormGroupStyled>
));

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

TextField.defaultProps = {
  disabled: false,
};

export default TextField;

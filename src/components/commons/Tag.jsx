import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Tag({ text, fontColor, bgColor, onClose }) {
  return (
    <TagContent bgColor={bgColor}>
      <BoxStyled>
        <TextStyled fontColor={fontColor}>{text}</TextStyled>
        {onClose && <ButtonStyled type="button" onClick={onClose} />}
      </BoxStyled>
    </TagContent>
  );
}

export default Tag;

Tag.propTypes = {
  text: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  fontColor: PropTypes.string,
  onClose: PropTypes.func,
};

Tag.defaultProps = {
  text: 'Fashion',
  bgColor: 'rgba(219, 16, 142, .1)',
  fontColor: '#3E3E3E',
};

const TagContent = styled.div`
  background-color: ${(props) => props.bgColor || 'rgba(219, 16, 142, .1)'};
  border-radius: 5px;
  padding 5px 6px;
  display: inline-block;
  margin-bottom: 8px;
  margin-right: 8px;
`;

const TextStyled = styled.span`
  color: ${(props) => props.fontColor || '#3E3E3E'};
  font: normal normal normal 13px/15px Helvetica Neue;
  letter-spacing: 0px;
  text-transform: capitalize;
`;

const ButtonStyled = styled.button`
  border: 0;
  outline: 0;
  background-color: #f9f9f9;
  border-radius: 100%;
  width: 13px;
  height: 13px;
  margin-left: 5px;
  cursor: pointer;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 0.55rem;
    background-color: #5770c6;
  }

  &::before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
    left: 6px;
    top: 2px;
  }

  &::after {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    transform: rotate(-45deg);
    right: 6px;
    top: 2px;
  }
`;

const BoxStyled = styled.div`
  display: flex;
  align-items: center;
`;

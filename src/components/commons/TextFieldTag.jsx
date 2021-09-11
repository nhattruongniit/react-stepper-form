import React, { useState, useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import LabelStyled from '../styled/LabelStyled';
import Tag from './Tag';

const TextFieldTag = forwardRef((props, ref) => {
  // States
  const [tags, setTags] = useState([]);
  const [subtitle, setSubTitle] = useState('');
  // Refs
  const inputRef = useRef(null);
  const canDispatch = useRef(false);

  // set default value
  useEffect(() => {
    if (!props.values) return;
    setTags(props.values);
    canDispatch.current = true;
  }, [props.values]);

  useEffect(() => {
    if (!canDispatch.current) return;

    canDispatch.current = false;
    const evt = new Event('input', { bubbles: true, cancelable: true });
    Object.defineProperty(evt, 'target', {
      writable: false,
      value: {
        value: tags,
        name: props.name,
      },
    });
    props.onChange(evt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, props.name]);

  // overwrite setter
  useEffect(() => {
    if (!inputRef.current) return;
    // Overwrite setter, if react-form-hook set value. we can catch the value from it and do something
    Object.defineProperty(inputRef.current, 'value', {
      set(newValue) {
        setTags(newValue);
      },
    });
  }, []);

  function onChangeSubtitle(e) {
    const { value } = e.target;
    setSubTitle(value);
  }

  function handleAddTag(e) {
    if (e.keyCode !== 13 || subtitle === '') return;
    canDispatch.current = true;
    setTags((prevState) => [...prevState, subtitle]);
    setSubTitle('');
  }

  function onClose(value) {
    canDispatch.current = true;
    setTags((prevState) => {
      const newTags = [...prevState];
      const tagIndex = newTags.findIndex((tag) => tag === value);
      newTags.splice(tagIndex, 1);
      return newTags;
    });
  }

  return (
    <WrapperStyled fullwidth={props.fullWidth} className={props.className}>
      <LabelStyled htmlFor={props.name}>{props.label}</LabelStyled>
      <input
        type="hidden"
        ref={(el) => {
          ref(el);
          inputRef.current = el;
        }}
        name={props.name}
      />
      <ContentStyeld error={props.error}>
        <LeadStyled>
          {tags.map((tag, index) => (
            <Tag key={`${tag}-${index}`} text={tag} onClose={() => onClose(tag)} />
          ))}
          <InputStyled type="text" value={subtitle} onChange={onChangeSubtitle} onKeyUp={handleAddTag} />
        </LeadStyled>
      </ContentStyeld>
    </WrapperStyled>
  );
});

export default TextFieldTag;

TextFieldTag.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  fullWidth: PropTypes.bool,
};

TextFieldTag.defaultProps = {
  label: 'KOL Affinity',
  name: 'KOL Affinity',
  fullWidth: false,
};

const WrapperStyled = styled.div`
  ${(props) =>
    props.fullwidth &&
    css`
      width: 100%;
    `}
`;

const ContentStyeld = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  width: 100%;
  padding: 10px 12px 0px 12px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  min-height: 46px;
  ${(props) =>
    props.error &&
    css`
      border-color: #f44336;
    `}
`;

const LeadStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const InputStyled = styled.input`
  border: 0;
  outline: 0;
  flex-grow: 1;
  margin-bottom: 8px;
`;

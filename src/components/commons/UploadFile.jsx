import React, { useState, useEffect, useRef } from 'react';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { ReactComponent as CameraIcon } from '../../assets/svg/camera.svg';
import { ReactComponent as CameraGradientIcon } from '../../assets/svg/camera-gradient.svg';

const UploadFile = forwardRef((props, ref) => {
  const { width, height, bgColor, values, ...otherProps } = props;
  const [files, setFiles] = useState(null);
  const [image, setImage] = useState(null);
  // Refs
  const inputRefs = useRef(null);
  const canDispatch = useRef(false);

  useEffect(() => {
    if (!values) return;
    setImage(values);
    canDispatch.current = true;
  }, [values]);

  useEffect(() => {
    if (!canDispatch.current) return;

    canDispatch.current = false;
    const evt = new Event('input', { bubbles: true, cancelable: true });
    Object.defineProperty(evt, 'target', {
      writable: false,
      value: {
        value: files,
        name: otherProps.name,
      },
    });
    otherProps.onChange(evt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, otherProps.name]);

  // overwrite setter
  useEffect(() => {
    if (!inputRefs.current) return;
    // Overwrite setter, if react-form-hook set value. we can catch the value from it and do something
    Object.defineProperty(inputRefs.current, 'value', {
      set(newValue) {
        setFiles(newValue);
      },
    });
  }, []);

  function onChooseFile(e) {
    if (e.target.files.length <= 0) return;
    const files = e.target.files[0];
    const url = URL.createObjectURL(files);
    canDispatch.current = true;
    setImage(url);
    setFiles(files);
  }

  return (
    <ColumnStyled>
      <ContainerStyled width={width} height={height} bgColor={image ? 'transparent' : bgColor}>
        <LabelUploadStyled htmlFor="upload-file" />
        <input
          type="hidden"
          ref={(el) => {
            ref.current = el;
            inputRefs.current = el;
          }}
        />
        <InputStyled accept="images/*" type="file" id="upload-file" onChange={onChooseFile} />
        <LabelStyled>
          <CameraIcon fill="#5770C6" />
        </LabelStyled>

        {image && (
          <>
            <ImageStyled src={image} alt="File Kols" title="File Kols" />
            <LabelStyled htmlFor="upload-file" isGradientCamera>
              <CameraGradientIcon />
            </LabelStyled>
          </>
        )}
      </ContainerStyled>
    </ColumnStyled>
  );
});

export default UploadFile;

UploadFile.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  bgColor: PropTypes.string,
};

UploadFile.defaultProps = {
  width: '168px',
  height: '167px',
  bgColor: '#fce6f3',
};

const LabelUploadStyled = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 1;
`;

const ContainerStyled = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bgColor};
  border-radius: 5px;
  opacity: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputStyled = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`;

const LabelStyled = styled.label`
  cursor: pointer;
  background: #ebf2fe 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  backdrop-filter: blur(7px);
  display: inline-block;
  padding: 17px;
  svg {
    width: 36px;
    height: 32px;
  }

  ${(props) =>
    props.isGradientCamera &&
    css`
      position: absolute;
      padding: 10px;
      display: flex;
      z-index: 3;
      top: 50%;
      right: -27px;
      transform: translateY(-50%);

      svg {
        width: 24px;
        height: 24px;
      }
    `}
`;

const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  object-fit: cover;
  border-radius: 5px;
`;

const ColumnStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

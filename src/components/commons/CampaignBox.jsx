import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { format, differenceInDays } from 'date-fns';

const TIME_FORMAT = 'dd/MM/yyyy';
const CampaignBox = forwardRef((props, ref) => {
  const title = useMemo(() => {
    return props.title;
  }, [props.title]);

  const imageSrc = useMemo(() => {
    return props.image;
  }, [props.image]);

  const time = useMemo(() => {
    return `${format(props.startTime, TIME_FORMAT)} - ${format(props.endTime, TIME_FORMAT)}`;
  }, [props.startTime, props.endTime]);

  const totalDay = useMemo(() => {
    const days = Math.abs(differenceInDays(props.startTime, props.endTime));
    return `(${days} ${days > 1 ? 'Days' : 'Day'})`;
  }, [props.startTime, props.endTime]);

  return (
    <WrapperStyled ref={ref} gap={props.gap}>
      <div className="box__left">
        <img className="box__img" src={imageSrc} alt="" />
      </div>
      <div className="box__right">
        <h3 className="box__title">{title}</h3>
        <p className="box__time">
          {time} <span className="box__day">{totalDay}</span>
        </p>
      </div>
    </WrapperStyled>
  );
});

CampaignBox.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gap: PropTypes.string, // distance between image and text such as "6px" or "6em"
};

CampaignBox.defaultProps = {};

export default CampaignBox;

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.gap || '16px'};
  .box {
    &__left {
      display: flex;
      align-items: center;
    }
    &__right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__img {
      border-radius: 5px;
      max-width: 50px;
    }
    &__title {
      font: normal normal bold 16px/19px Helvetica Neue;
      color: #0b0b0b;
      font-size: 16px;
      margin: 0;
    }
    &__time {
      font: normal normal normal 14px/16px Helvetica Neue;
      color: #707070;
      font-size: 14px;
      margin: 0;
      white-space: nowrap;
    }
    &__day {
      font: normal normal normal 12px/14px Helvetica Neue;
      color: #949494;
      font-size: 12px;
      margin-left: 10px;
    }
  }
`;

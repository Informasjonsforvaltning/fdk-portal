import React, { PropsWithChildren, FC } from 'react';
import SC from './styled';
import localization from '../../../lib/localization';

interface Props {
  time: number;
}

const todayOrDate = (time: number) => {
  const inputDate = new Date(time);
  const todaysDate = new Date();

  return inputDate.setHours(0, 0, 0, 0) === todaysDate.setHours(0, 0, 0, 0)
    ? localization.community.today
    : `${`0${inputDate.getDate()}`.slice(-2)}.${`0${
        inputDate.getMonth() + 1
      }`.slice(-2)}.${inputDate.getFullYear()}`;
};

const getFullDate = (time: number) => {
  const inputDate = new Date(time);
  const date = todayOrDate(time);
  const minutes: number = Number(inputDate.getMinutes());
  const twoDigMin = (minutes < 10 ? '0' : '') + minutes;
  const hours: number = Number(inputDate.getHours());
  const twoDigHours = (hours < 10 ? '0' : '') + hours;

  return `${date} 
    ${localization.community.clock}
    ${twoDigHours}:${twoDigMin}`;
};

const TimeStamp: FC<PropsWithChildren<Props>> = ({ time }) => (
  <SC.TimeStamp>{getFullDate(time)}</SC.TimeStamp>
);

export default TimeStamp;

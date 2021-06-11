import React, { FC } from 'react';

import translations from '../../../lib/localization';

interface Props {
  startTime: number;
  lowercase?: boolean;
}

const timeAgoString = (startTime: number): string => {
  const millis = Date.now() - startTime;
  const minutes = Math.floor(millis / (60 * 1000));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  const { singular, plural } = translations.community.timeago;

  if (years) {
    return years > 1 ? `${years} ${plural.years}` : singular.years;
  }
  if (months) {
    return months > 1 ? `${months} ${plural.months}` : singular.months;
  }
  if (days) {
    return days > 1 ? `${days} ${plural.days}` : singular.days;
  }
  if (hours) {
    return hours > 1 ? `${hours} ${plural.hours}` : singular.hours;
  }
  if (minutes) {
    return minutes > 1 ? `${minutes} ${plural.minutes}` : singular.minutes;
  }
  return singular.seconds;
};

const TimeAgo: FC<Props> = ({ startTime, lowercase }) => (
  <span>
    {lowercase
      ? timeAgoString(startTime).toLowerCase()
      : timeAgoString(startTime)}
  </span>
);

export default TimeAgo;
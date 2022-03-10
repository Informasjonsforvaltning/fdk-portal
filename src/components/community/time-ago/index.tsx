import React, { FC } from 'react';

import translations from '../../../lib/localization';

interface Props {
  startTime: number;
  cutOff?: number;
  lowercase?: boolean;
}

const timeAgoString = (startTime: number, cutOff?: number): string => {
  const millis = Date.now() - startTime;
  const minutes = Math.floor(millis / (60 * 1000));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  const { singular, plural } = translations.community.timeago;

  if (cutOff != null && millis > cutOff) {
    return new Date(startTime).toLocaleString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

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

const TimeAgo: FC<Props> = ({ startTime, lowercase, cutOff }) => (
  <span>
    {lowercase
      ? timeAgoString(startTime, cutOff).toLowerCase()
      : timeAgoString(startTime, cutOff)}
  </span>
);

export default TimeAgo;

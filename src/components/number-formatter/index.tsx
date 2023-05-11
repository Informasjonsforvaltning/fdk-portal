import React, { FC } from 'react';
import SC from './styled';

interface Props {
  number: number;
}

const NumberFormatter: FC<Props> = ({ number }) => {
  // Format number with commas
  function numberWithCommas(num: number) {
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  // Replace commas with span
  const formattedNum = (
    <>
      {numberWithCommas(number)
        .split(',')
        .map((part, i) =>
          i === 0 ? (
            <span>{part}</span>
          ) : (
            <SC.NumberFormatMargin>{part}</SC.NumberFormatMargin>
          )
        )}
    </>
  );

  return formattedNum;
};

export default NumberFormatter;

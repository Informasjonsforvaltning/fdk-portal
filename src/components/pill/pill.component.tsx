import React, { FC, HTMLAttributes, memo } from 'react';

import SC from './styled';

interface Props extends HTMLAttributes<HTMLElement> {
  label: string;
}

const PillPure: FC<Props> = ({ label, ...props }) => {
  if (!label) {
    return null;
  }

  return (
    <SC.Pill>
      <SC.Label>{label}</SC.Label>
      <SC.ClearButton type='button' {...props}>
        <i className='fa fa-times-circle' />
      </SC.ClearButton>
    </SC.Pill>
  );
};

export const Pill = memo(PillPure);

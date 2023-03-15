import React, { FC, HTMLAttributes, memo } from 'react';
import localization from '../../lib/localization';

import SC from './styled';

interface Props extends HTMLAttributes<HTMLElement> {
  label: string;
  onClear: () => void;
}

const PillPure: FC<Props> = ({ label, onClear }) => {
  if (!label) {
    return null;
  }

  return (
    <SC.Pill>
      <SC.Label>{label}</SC.Label>
      <SC.ClearButton
        type='button'
        onClick={onClear}
        aria-label={localization.query.reset}
      >
        <SC.CrossIcon />
      </SC.ClearButton>
    </SC.Pill>
  );
};

export const Pill = memo(PillPure);

import React, { memo } from 'react';
import type { FC } from 'react';
import { compose } from 'redux';
import SvgIcon from '@fellesdatakatalog/icons';
import SC from './styled';

interface ExternalProps extends React.HTMLProps<HTMLButtonElement> {
  isExpanded?: boolean;
}

interface Props extends ExternalProps {}

const ExpansionIndicatorDefault: FC<Props> = ({ isExpanded = false }) => (
  <SC.Button>
    {isExpanded ? (
      <SvgIcon name='chevronUpStroke' />
    ) : (
      <SvgIcon name='chevronDownStroke' />
    )}
  </SC.Button>
);

export default compose<FC<ExternalProps>>(memo)(ExpansionIndicatorDefault);

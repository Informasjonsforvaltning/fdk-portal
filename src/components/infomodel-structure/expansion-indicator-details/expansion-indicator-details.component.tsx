import React, { FC, memo } from 'react';

import SC from './styled';
import localization from '../../../lib/localization';

interface Props {
  isExpanded?: boolean;
}

const ExpansionIndicatorDetailsPure: FC<Props> = ({ isExpanded = false }) =>
  isExpanded ? (
    <>
      <SC.CollapseIcon />
      <SC.IndicatorText>{localization.closeDetails}</SC.IndicatorText>
    </>
  ) : (
    <>
      <SC.ExpandIcon />
      <SC.IndicatorText>{localization.showDetails}</SC.IndicatorText>
    </>
  );

export const ExpansionIndicatorDetails = memo(ExpansionIndicatorDetailsPure);

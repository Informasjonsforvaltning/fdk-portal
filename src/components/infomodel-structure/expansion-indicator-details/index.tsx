import React, { FC, memo } from 'react';
import { compose } from 'redux';

import localization from '../../../lib/localization';

import SC from './styled';

interface ExternalProps {
  isExpanded?: boolean;
}

interface Props extends ExternalProps {}

const ExpansionIndicatorDetails: FC<Props> = ({ isExpanded = false }) => (
  <SC.IndicatorContainer>
    {isExpanded ? <SC.CollapseIcon /> : <SC.ExpandIcon />}
    <SC.IndicatorText>
      {isExpanded ? localization.closeDetails : localization.showDetails}
    </SC.IndicatorText>
  </SC.IndicatorContainer>
);

export default compose<FC<ExternalProps>>(memo)(ExpansionIndicatorDetails);

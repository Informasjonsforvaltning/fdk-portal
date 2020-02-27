import React, { FC, memo } from 'react';

import SC from './styled';
import { ExpansionPanelHead } from '../../../../../components/expansion-panel';
import { Property } from '../../../../../types';
import { ExpansionIndicatorDetails } from '../../expansion-indicator-details/expansion-indicator-details.component';
import { getTranslateText } from '../../../../../lib/translateText';
import { createMultiplicityRange } from '../../../../../lib/multiplicity-range';

interface Props {
  property: Partial<Property>;
}

const ElementPure: FC<Props> = ({ property: { name, parameters } }) => (
  <SC.ObjectTypeElementExpansionPanel
    shouldExpandOnHeadClick={false}
    expansionIndicator={{
      expand: <ExpansionIndicatorDetails />,
      collapse: <ExpansionIndicatorDetails isExpanded />
    }}
  >
    <ExpansionPanelHead>
      {name && <strong>{getTranslateText(name)}:</strong>}
      <span>{createMultiplicityRange(parameters)}</span>
    </ExpansionPanelHead>
  </SC.ObjectTypeElementExpansionPanel>
);

export const Element = memo(ElementPure);

import React, { FC, memo } from 'react';
import Scroll from 'react-scroll';

import SC from './styled';
import {
  ExpansionPanelBody,
  ExpansionPanelHead
} from '../../../../../components/expansion-panel';
import { Property } from '../../../../../types';
import { ExpansionIndicatorDetails } from '../../expansion-indicator-details/expansion-indicator-details.component';
import { getTranslateText } from '../../../../../lib/translateText';
import { createMultiplicityRange } from '../../../../../lib/multiplicity-range';
import { Description } from '../../model-description/model-description.component';

const ScrollLink = Scroll.Link;

interface Props {
  property: Partial<Property>;
}

const ElementPure: FC<Props> = ({
  property: { identifier, name, parameters, type, concept }
}) => (
  <SC.ObjectTypeElementExpansionPanel
    shouldExpandOnHeadClick={false}
    expansionIndicator={{
      expand: <ExpansionIndicatorDetails />,
      collapse: <ExpansionIndicatorDetails isExpanded />
    }}
  >
    <ExpansionPanelHead>
      {name && <strong>{getTranslateText(name)}:</strong>}
      <div>
        {type && type.identifier && (
          <ScrollLink
            to={type.identifier}
            spy
            smooth
            isDynamic
            offset={0}
            duration={1500}
          >
            <span>{getTranslateText(type.name)}</span>
          </ScrollLink>
        )}
        <span>{createMultiplicityRange(parameters)}</span>
      </div>
    </ExpansionPanelHead>
    <ExpansionPanelBody>
      {(identifier || concept) && (
        <Description identifier={identifier} concept={concept} />
      )}
    </ExpansionPanelBody>
  </SC.ObjectTypeElementExpansionPanel>
);

export const Element = memo(ElementPure);

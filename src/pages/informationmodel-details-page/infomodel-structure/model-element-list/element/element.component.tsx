import React, { FC, memo } from 'react';
import Scroll from 'react-scroll';

import SC from './styled';
import {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '../../../../../components/expansion-panel';
import { Description } from '../../model-description/model-description.component';
import { ModelElement } from '../../../../../types';
import { ExpansionIndicatorDetails } from '../../expansion-indicator-details/expansion-indicator-details.component';
import { getTranslateText } from '../../../../../lib/translateText';

interface Props {
  element: Partial<ModelElement>;
}

const ElementPure: FC<Props> = ({
  element: { name, elementDescription, referencedObject, range }
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
      {referencedObject && referencedObject.refId && (
        <Scroll.Link
          to={referencedObject.refId}
          spy
          smooth
          isDynamic
          offset={0}
          duration={1500}
        >
          <span>{referencedObject.refId}</span>
        </Scroll.Link>
      )}
      {referencedObject && <span>{referencedObject?.refId}</span>}
      {range && <span>{range}</span>}
    </ExpansionPanelHead>
    <ExpansionPanelBody>
      {elementDescription && (
        <Description modelDescription={elementDescription} />
      )}
    </ExpansionPanelBody>
  </SC.ObjectTypeElementExpansionPanel>
);

export const Element = memo(ElementPure);

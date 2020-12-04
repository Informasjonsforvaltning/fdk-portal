import React, { memo, FC, ComponentProps } from 'react';
import { compose } from 'redux';
import Scroll from 'react-scroll';
import Link from '@fellesdatakatalog/link';

import { getTranslateText as translate } from '../../../../lib/translateText';

import {
  ExpansionPanelBody,
  ExpansionPanelHead
} from '../../../expansion-panel';
import { ExpansionIndicatorDetails } from '../../expansion-indicator-details/expansion-indicator-details.component';
import { Description } from '../../model-description/model-description.component';

import SC from './styled';

import type {
  InformationModelElement,
  InformationModelProperty,
  ModelCodeElement,
  Concept
} from '../../../../types';

interface ExternalProps {
  property: Partial<InformationModelProperty>;
  code: Partial<ModelCodeElement>;
  modelElements: Record<string, Partial<InformationModelElement>>;
  concepts: Record<string, Concept>;
}

interface Props extends ExternalProps {}

type ScollLinkType = FC<
  Omit<ComponentProps<typeof Scroll.Link>, 'as'> & ComponentProps<typeof Link>
>;

const Element: FC<Props> = ({ property, code, modelElements, concepts }) => {
  const identifier = property.identifier || code.identifier;
  const title = translate(property.title || code.prefLabel);
  const description = translate(property.description);
  const belongsToModule = property.belongsToModule;
  const typeUri =
    property.hasDataType ??
    property.hasSimpleType ??
    property.hasObjectType ??
    property.hasValueFrom ??
    property.refersTo ??
    property.hasMember ??
    property.contains;
  const typeUris = property.hasType ?? property.hasSome;
  const type = typeUri ? modelElements[typeUri] : null;
  const types = typeUris
    ? typeUris.map(uri => modelElements[uri]).filter(Boolean)
    : null;
  const notation = code.notation;
  const minOccurs = property.minOccurs;
  const maxOccurs = property.maxOccurs;
  const subject = property.subject ?? code.subject;

  const ScollLink = Link as ScollLinkType;

  const renderMultiplicityRange = () => {
    if (minOccurs && minOccurs === maxOccurs) {
      return minOccurs;
    }

    if (minOccurs && !maxOccurs) {
      return `${minOccurs}..*`;
    }

    if (!minOccurs && maxOccurs) {
      return `0..${maxOccurs}`;
    }

    if (minOccurs && maxOccurs) {
      return `${minOccurs}..${maxOccurs}`;
    }

    return null;
  };

  return (
    <SC.ObjectTypeElementExpansionPanel
      shouldExpandOnHeadClick={false}
      expansionIndicator={{
        expand: <ExpansionIndicatorDetails />,
        collapse: <ExpansionIndicatorDetails isExpanded />
      }}
    >
      <ExpansionPanelHead>
        <strong>{title}</strong>
        <span>
          {type && (
            <ScollLink
              to={type.identifier ?? type.uri ?? ''}
              spy
              smooth
              isDynamic
              offset={0}
              duration={1500}
              as={Scroll.Link}
            >
              {translate(type.title)}
            </ScollLink>
          )}
          {types?.map(({ identifier, uri, title }, index) => (
            <ScollLink
              key={identifier ?? uri ?? `scroll-link-${index}`}
              to={identifier ?? uri ?? ''}
              spy
              smooth
              isDynamic
              offset={0}
              duration={1500}
              as={Scroll.Link}
            >
              {translate(title)}
            </ScollLink>
          ))}
          {notation}
        </span>
        <span>{renderMultiplicityRange()}</span>
      </ExpansionPanelHead>
      <ExpansionPanelBody>
        {(identifier ||
          description ||
          belongsToModule ||
          (subject && concepts[subject])) && (
          <Description
            identifier={identifier}
            description={description}
            concept={subject ? concepts[subject] : undefined}
            belongsToModule={belongsToModule}
          />
        )}
      </ExpansionPanelBody>
    </SC.ObjectTypeElementExpansionPanel>
  );
};

export default compose<FC<ExternalProps>>(memo)(Element);

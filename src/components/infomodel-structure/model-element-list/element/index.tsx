import React, { memo, FC, ComponentProps } from 'react';
import { compose } from 'redux';
import Scroll from 'react-scroll';
import Link from '@fellesdatakatalog/link';

import { getTranslateText as translate } from '../../../../lib/translateText';

import {
  ExpansionPanelBody,
  ExpansionPanelHead
} from '../../../expansion-panel';
import ExpansionIndicatorDetails from '../../expansion-indicator-details';
import Description from '../../model-description';

import SC from './styled';

import type {
  InformationModelElement,
  InformationModelProperty,
  ModelCodeElement,
  Concept
} from '../../../../types';
import { ModelElementType } from '../../../../types/enums';

interface ExternalProps {
  property: Partial<InformationModelProperty>;
  code: Partial<ModelCodeElement>;
  modelElements: Record<string, Partial<InformationModelElement>>;
  concepts: Record<string, Concept>;
  type: ModelElementType;
}

interface Props extends ExternalProps {}

type ScollLinkType = FC<
  Omit<ComponentProps<typeof Scroll.Link>, 'as'> & ComponentProps<typeof Link>
>;

const Element: FC<Props> = ({
  property,
  code,
  modelElements,
  concepts,
  type
}) => {
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
    property.contains ??
    property.hasGeneralConcept;
  const typeUris = property.hasType ?? property.hasSome;
  const modelElementType = typeUri ? modelElements[typeUri] : null;
  const modelElementTypes = typeUris
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
    <SC.ExpansionPanel
      shouldExpandOnHeadClick={false}
      expansionIndicator={{
        expand: <ExpansionIndicatorDetails />,
        collapse: <ExpansionIndicatorDetails isExpanded />
      }}
    >
      <ExpansionPanelHead>
        <SC.ElementTitle $type={type}>{title}</SC.ElementTitle>
        <span>
          {modelElementType && (
            <ScollLink
              to={modelElementType.uri ?? modelElementType.identifier ?? ''}
              spy
              smooth
              isDynamic
              offset={0}
              duration={1500}
              as={SC.ScrollLink}
            >
              {translate(modelElementType.title)}
            </ScollLink>
          )}
          {modelElementTypes?.map(({ identifier, uri, title }, index) => (
            <ScollLink
              key={identifier ?? uri ?? `scroll-link-${index}`}
              to={uri ?? identifier ?? ''}
              spy
              smooth
              isDynamic
              offset={0}
              duration={1500}
              as={SC.ScrollLink}
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
    </SC.ExpansionPanel>
  );
};

export default compose<FC<ExternalProps>>(memo)(Element);

import React, { memo, FC, ComponentProps } from 'react';
import { compose } from 'redux';
import Scroll from 'react-scroll';
import Link from '@fellesdatakatalog/link';
import {
  ExpansionPanelBody,
  ExpansionPanelHead
} from '@fellesdatakatalog/expansion-panel';

import { getTranslateText as translate } from '../../../../lib/translateText';

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

import AssociationIcon from '../../../../images/icon-infomod-accosiation-sm.svg';
import AttributeIcon from '../../../../images/icon-infomod-attribute-sm.svg';
import ChoiceIcon from '../../../../images/icon-infomod-choice-sm.svg';
import CodeIcon from '../../../../images/icon-infomod-code-sm.svg';
import CollectionIcon from '../../../../images/icon-infomod-collection-sm.svg';
import CompositionIcon from '../../../../images/icon-infomod-composition-sm.svg';
import MultipleChoiceIcon from '../../../../images/icon-infomod-choice-multiple-sm.svg';
import RoleIconRight from '../../../../images/icon-infomod-role-right-sm.svg';
import RoleIconLeft from '../../../../images/icon-infomod-role-left-sm.svg';
import SpecializationIcon from '../../../../images/icon-infomod-specialization-sm.svg';

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
  const identifier =
    property.identifier || code.identifier || property.uri || code.uri;
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

  const renderElementIcon = (type: ModelElementType) => {
    switch (type) {
      case ModelElementType.ASSOCIATION:
        return <AssociationIcon />;
      case ModelElementType.BIDIR_IN:
        return <RoleIconLeft />;
      case ModelElementType.BIDIR_OUT:
        return <RoleIconRight />;
      case ModelElementType.CHOICE:
        return <ChoiceIcon />;
      case ModelElementType.CODE_ELEMENT:
        return <CodeIcon />;
      case ModelElementType.COLLECTION:
        return <CollectionIcon />;
      case ModelElementType.COMPOSITION:
        return <CompositionIcon />;
      case ModelElementType.MULTIPLE_CHOICE:
        return <MultipleChoiceIcon />;
      case ModelElementType.ROLE:
        return <RoleIconRight />;
      case ModelElementType.SPECIALIZATION:
        return <SpecializationIcon />;
      case ModelElementType.ATTRIBUTE:
      default:
        return <AttributeIcon />;
    }
  };

  return (
    <SC.ExpansionPanel
      shouldExpandOnHeadClick={false}
      expansionIndicator={{
        expand: <ExpansionIndicatorDetails />,
        collapse: <ExpansionIndicatorDetails isExpanded />
      }}
      type={type}
    >
      <ExpansionPanelHead>
        {renderElementIcon(type)}
        <SC.ElementTitle>
          {type === ModelElementType.CODE_ELEMENT ? notation : title}
        </SC.ElementTitle>
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
          <SC.ElementTypesContainer length={modelElementTypes?.length ?? 0}>
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
          </SC.ElementTypesContainer>
          {type === ModelElementType.CODE_ELEMENT ? title : notation}
        </span>
        <SC.MultiplicityRange>{renderMultiplicityRange()}</SC.MultiplicityRange>
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

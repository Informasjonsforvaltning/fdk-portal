import React, { FC, ComponentProps } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import Scroll from 'react-scroll';
import Link from '@fellesdatakatalog/link';

import { getTranslateText as translate } from '../../../lib/translateText';
import localization from '../../../lib/localization';

import SC from './styled';

import type {
  Concept,
  TextLanguage,
  InformationModelElement
} from '../../../types';

interface Props {
  identifier?: string;
  description?: Partial<TextLanguage> | null;
  belongsToModule?: string | null;
  version?: string;
  concept?: Partial<Concept>;
  abstraction?: Partial<InformationModelElement> | null;
  realization?: Partial<InformationModelElement> | null;
  specialization?: Partial<InformationModelElement> | null;
}

type ScollLinkType = FC<
  Omit<ComponentProps<typeof Scroll.Link>, 'as'> & ComponentProps<typeof Link>
>;

const ScollLink = Link as ScollLinkType;

export const Description: FC<Props> = ({
  identifier,
  description,
  version,
  concept: { id, prefLabel, definition, publisher, uri } = {},
  belongsToModule,
  abstraction,
  realization,
  specialization
}) => (
  <SC.ModelDescription>
    {description && (
      <SC.DescriptionField>
        <strong>{localization.description}:</strong>
        {translate(description)}
      </SC.DescriptionField>
    )}

    {identifier && (
      <SC.DescriptionField>
        <strong>{localization.infoMod.identifier}:</strong>
        {translate(identifier)}
      </SC.DescriptionField>
    )}

    {version && (
      <SC.DescriptionField>
        <strong>{localization.infoMod.version}:</strong>
        {translate(version)}
      </SC.DescriptionField>
    )}

    {prefLabel && (
      <SC.DescriptionField>
        <strong>{localization.facet.concept}:</strong>
        <RouteLink to={`/concepts/${id}`}>{translate(prefLabel)}</RouteLink>
      </SC.DescriptionField>
    )}

    {definition && definition.text && (
      <SC.DescriptionField>
        <strong>{localization.concept.definition}:</strong>
        {translate(definition.text)}
      </SC.DescriptionField>
    )}

    {publisher && (
      <SC.DescriptionField>
        <strong>{localization.responsible}:</strong>
        {translate(publisher.prefLabel) || publisher.name}
      </SC.DescriptionField>
    )}

    {uri && (
      <SC.DescriptionField>
        <strong>
          {localization.infoMod.modelDescription.conceptReference}:
        </strong>
        {uri}
      </SC.DescriptionField>
    )}

    {translate(belongsToModule) && (
      <SC.DescriptionField>
        <strong>
          {localization.infoMod.modelDescription.belongsToModule}:
        </strong>
        {translate(belongsToModule)}
      </SC.DescriptionField>
    )}

    {abstraction && (
      <SC.DescriptionField>
        <strong>{localization.infoMod.modelDescription.abstractionOf}:</strong>
        <ScollLink
          to={abstraction.identifier ?? abstraction.uri ?? ''}
          spy
          smooth
          isDynamic
          offset={0}
          duration={1500}
          as={Scroll.Link}
        >
          {translate(abstraction.title)}
        </ScollLink>
      </SC.DescriptionField>
    )}

    {realization && (
      <SC.DescriptionField>
        <strong>{localization.infoMod.modelDescription.realizationOf}:</strong>
        <ScollLink
          to={realization.identifier ?? realization.uri ?? ''}
          spy
          smooth
          isDynamic
          offset={0}
          duration={1500}
          as={Scroll.Link}
        >
          {translate(realization.title)}
        </ScollLink>
      </SC.DescriptionField>
    )}

    {specialization && (
      <SC.DescriptionField>
        <strong>
          {localization.infoMod.modelDescription.specializationOf}:
        </strong>
        <ScollLink
          to={specialization.identifier ?? specialization.uri ?? ''}
          spy
          smooth
          isDynamic
          offset={0}
          duration={1500}
          as={Scroll.Link}
        >
          {translate(specialization.title)}
        </ScollLink>
      </SC.DescriptionField>
    )}
  </SC.ModelDescription>
);

import React, { memo, FC, ComponentProps } from 'react';
import { compose } from 'redux';
import { Link as RouteLink } from 'react-router-dom';
import Scroll from 'react-scroll';
import Link from '@fellesdatakatalog/link';
import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';

import { getTranslateText as translate } from '../../../lib/translateText';
import localization from '../../../lib/localization';

import SC from './styled';

import type {
  Concept,
  TextLanguage,
  InformationModelElement
} from '../../../types';

interface ExternalProps {
  identifier?: string;
  description?: Partial<TextLanguage> | null;
  belongsToModule?: string | null;
  version?: string;
  concept?: Partial<Concept>;
  abstraction?: Partial<InformationModelElement> | null;
  realization?: Partial<InformationModelElement> | null;
  specialization?: Partial<InformationModelElement> | null;
}

interface Props extends ExternalProps {}

type ScollLinkType = FC<
  Omit<ComponentProps<typeof Scroll.Link>, 'as'> & ComponentProps<typeof Link>
>;

const ScollLink = Link as ScollLinkType;

const Description: FC<Props> = ({
  identifier,
  description,
  version,
  concept: { id, prefLabel, definition, publisher } = {},
  belongsToModule,
  abstraction,
  realization,
  specialization
}) => (
  <SC.ModelDescription>
    {description && (
      <SC.DescriptionField>
        <strong>{localization.description}:</strong>
        <p>
          {parse(
            sanitizeHtml(translate(description) ?? '', {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(['a'])
            })
          )}
        </p>
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
        <SC.Link to={`/concepts/${id}`} forwardedAs={RouteLink}>
          {translate(prefLabel)}
        </SC.Link>
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
          as={SC.ScrollLink}
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
          as={SC.ScrollLink}
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
          as={SC.ScrollLink}
        >
          {translate(specialization.title)}
        </ScollLink>
      </SC.DescriptionField>
    )}
  </SC.ModelDescription>
);

export default compose<FC<ExternalProps>>(memo)(Description);

import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import SC from './styled';
import { Concept, TextLanguage } from '../../../../types';
import { getTranslateText } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';

interface Props {
  identifier?: string;
  description?: Partial<TextLanguage>;
  version?: string;
  concept?: Partial<Concept>;
}

export const Description: FC<Props> = ({
  identifier,
  description,
  version,
  concept: { id, prefLabel, definition, publisher, uri } = {}
}) => (
  <SC.ModelDescription>
    {description && (
      <SC.DescriptionField>
        <strong>{localization.description}:</strong>
        {getTranslateText(description)}
      </SC.DescriptionField>
    )}

    {identifier && (
      <SC.DescriptionField>
        <strong>{localization.infoMod.identifier}:</strong>
        {getTranslateText(identifier)}
      </SC.DescriptionField>
    )}

    {version && (
      <SC.DescriptionField>
        <strong>{localization.infoMod.version}:</strong>
        {getTranslateText(version)}
      </SC.DescriptionField>
    )}

    {prefLabel && (
      <SC.DescriptionField>
        <strong>{localization.facet.concept}:</strong>
        <Link to={`/concepts/${id}`}>{getTranslateText(prefLabel)}</Link>
      </SC.DescriptionField>
    )}

    {definition && definition.text && (
      <SC.DescriptionField>
        <strong>{localization.concept.definition}:</strong>
        {getTranslateText(definition.text)}
      </SC.DescriptionField>
    )}

    {publisher && (
      <SC.DescriptionField>
        <strong>{localization.responsible}:</strong>
        {getTranslateText(publisher.prefLabel) || publisher.name}
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
  </SC.ModelDescription>
);

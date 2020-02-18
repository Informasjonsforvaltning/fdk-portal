import React, { FC } from 'react';

import SC from './styled';
import { ModelDescription } from '../../../../types';
import { getTranslateText } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';
import { LinkExternal } from '../../../../components/link-external/link-external.component';

interface Props {
  modelDescription: Partial<ModelDescription>;
}

export const Description: FC<Props> = ({
  modelDescription: { description, identifier, belongsToModule, concept }
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
        <strong>{localization.concept.identifier}:</strong>
        <LinkExternal
          uri={getTranslateText(identifier)}
          prefLabel={getTranslateText(identifier)}
        />
      </SC.DescriptionField>
    )}
    {belongsToModule && (
      <SC.DescriptionField>
        <strong>
          {localization.infoMod.modelDescription.belongsToModule}:
        </strong>
        {getTranslateText(belongsToModule)}
      </SC.DescriptionField>
    )}

    {concept?.anbefaltTerm && (
      <SC.DescriptionField>
        <strong>{localization.facet.concept}:</strong>
        {getTranslateText(concept.anbefaltTerm)}
      </SC.DescriptionField>
    )}
    {concept?.definition && (
      <SC.DescriptionField>
        <strong>{localization.concept.definition}:</strong>
        {getTranslateText(concept.definition)}
      </SC.DescriptionField>
    )}
    {concept?.publisher && (
      <SC.DescriptionField>
        <strong>{localization.responsible}:</strong>
        {getTranslateText(concept.publisher?.prefLabel) ||
          concept.publisher?.name}
      </SC.DescriptionField>
    )}
    {concept?.conceptReference && (
      <SC.DescriptionField>
        <strong>
          {localization.infoMod.modelDescription.conceptReference}:
        </strong>
        <LinkExternal
          uri={concept.conceptReference}
          prefLabel={concept.conceptReference}
        />
      </SC.DescriptionField>
    )}
  </SC.ModelDescription>
);

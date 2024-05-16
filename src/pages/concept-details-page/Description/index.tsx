import React from 'react';
import Link from '@fellesdatakatalog/link';
import { Divider } from '@digdir/design-system-react';
import { ContentSection } from '../../../components/details-page';
import translations from '../../../lib/localization';
import MultiLingualField from '../../../components/multilingual-field';
import SC from './styled';
import { getTranslateText as translate } from '../../../lib/translateText';
import {
  AudienceTypes,
  ConceptDefinition,
  Language
} from '../../../types/domain';
import { capitalizeFirstLetter } from '../../../utils/common';

interface Props {
  descriptions: ConceptDefinition[];
  selectedLanguages: Language[] | [];
  audienceTypes?: AudienceTypes;
}

const Description = ({
  descriptions,
  selectedLanguages,
  audienceTypes
}: Props) => {
  const renderSources = (description: ConceptDefinition) => {
    if (description.sourceRelationship === 'egendefinert') {
      return `${translations.compare.source}: ${
        translations.sourceRelationship[description?.sourceRelationship]
      }`;
    }
    return description?.sources?.length ? (
      <>
        <span>
          {`${translations.compare.source}: ${
            description.sourceRelationship
              ? translations.sourceRelationship[description?.sourceRelationship]
              : ''
          }`}
        </span>
        {description.sources.map(({ text, uri }, index) => (
          <span key={`${text}-${uri}-${index}`}>
            {index > 0 && ','}
            &nbsp;
            {uri ? (
              <Link href={uri} external>
                {translate(text) || uri}
              </Link>
            ) : (
              translate(text)
            )}
          </span>
        ))}
      </>
    ) : null;
  };

  const sortedDescriptions = descriptions.sort((a, b) => {
    if (!a.targetGroup && b.targetGroup) {
      return -1;
    }
    if (a.targetGroup && !b.targetGroup) {
      return 1;
    }
    if (!a.targetGroup && !b.targetGroup) {
      return 0;
    }
    return a.targetGroup!.localeCompare(b.targetGroup!);
  });

  return (
    <ContentSection
      id='description'
      title={translations.detailsPage.sectionTitles.concept.definition}
      truncate
    >
      {sortedDescriptions.map((description, index) => (
        <>
          {description.targetGroup && (
            <SC.AudienceType>
              {capitalizeFirstLetter(
                translate(
                  audienceTypes?.audienceTypes?.find(
                    audienceType => audienceType.uri === description.targetGroup
                  )?.label
                )
              )}
            </SC.AudienceType>
          )}

          <MultiLingualField
            languages={selectedLanguages}
            text={description.text}
            convertToMarkUp
          />
          <SC.Sources>{renderSources(description)}</SC.Sources>
          {index + 1 < sortedDescriptions.length && <Divider />}
        </>
      ))}
    </ContentSection>
  );
};

export default Description;

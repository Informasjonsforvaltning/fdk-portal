import React from 'react';
import Link from '@fellesdatakatalog/link';
import { ContentSection } from '../../../components/details-page';
import translations from '../../../lib/localization';
import MultiLingualField from '../../../components/multilingual-field';
import SC from './styled';
import { getTranslateText as translate } from '../../../lib/translateText';
import { Language } from '../../../types/domain';

interface Props {
  description: Record<string, string>;
  selectedLanguages: Language[] | [];
  sources: Array<{ text?: string; uri?: string }>;
  sourceRelationship: string | undefined;
}

const Description = ({
  description,
  sources,
  sourceRelationship,
  selectedLanguages
}: Props) => {
  const renderSources = () => {
    if (sourceRelationship === 'egendefinert') {
      return `${translations.compare.source}: ${translations.sourceRelationship[sourceRelationship]}`;
    }

    return sources?.length ? (
      <>
        <span>
          {`${translations.compare.source}: ${
            sourceRelationship
              ? translations.sourceRelationship[sourceRelationship]
              : ''
          }`}
        </span>
        {sources.map(({ text, uri }, index) => (
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

  return (
    <ContentSection
      id='description'
      title={translations.detailsPage.sectionTitles.concept.definition}
      truncate
    >
      <MultiLingualField
        languages={selectedLanguages}
        text={description}
        convertToMarkUp
      />
      <SC.Sources>{renderSources()}</SC.Sources>
    </ContentSection>
  );
};

export default Description;

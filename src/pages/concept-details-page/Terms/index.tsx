import React from 'react';
import {
  ContentSection,
  KeyValueList,
  KeyValueListItem
} from '../../../components/details-page';
import translations from '../../../lib/localization';
import MultiLingualField from '../../../components/multilingual-field';
import { Language, TextLanguage } from '../../../types';
import { languageSorter } from '../../../lib/languageSorter';

interface Props {
  altLabels: Partial<TextLanguage>[];
  hiddenLabels: Partial<TextLanguage>[];
  hasFieldSelectedLanguage: (field: Partial<TextLanguage>[]) => boolean;
  selectedLanguages: Language[];
}

const Terms = ({
  hasFieldSelectedLanguage,
  selectedLanguages,
  altLabels,
  hiddenLabels
}: Props) => (
  <ContentSection
    id='terms'
    title={translations.detailsPage.sectionTitles.concept.terms}
  >
    <KeyValueList>
      {hasFieldSelectedLanguage(altLabels) && (
        <KeyValueListItem
          property={translations.concept.altLabel}
          value={languageSorter(altLabels).map((altLabel, index) => (
            <MultiLingualField
              key={index}
              languages={selectedLanguages}
              text={altLabel}
              useFallback={false}
            />
          ))}
        />
      )}
      {hasFieldSelectedLanguage(hiddenLabels) && (
        <KeyValueListItem
          property={translations.concept.hiddenLabel}
          value={languageSorter(hiddenLabels).map((hiddenLabel, index) => (
            <MultiLingualField
              key={index}
              languages={selectedLanguages}
              text={hiddenLabel}
              useFallback={false}
            />
          ))}
        />
      )}
    </KeyValueList>
  </ContentSection>
);

export default Terms;

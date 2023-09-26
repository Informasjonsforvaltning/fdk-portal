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
  applications: Partial<TextLanguage>[];
  subjectLabels: Partial<TextLanguage>[];
  hasFieldSelectedLanguage: (field: Partial<TextLanguage>[]) => boolean;
  selectedLanguages: Language[];
}

const SubjectAndApplication = ({
  subjectLabels,
  hasFieldSelectedLanguage,
  selectedLanguages,
  applications
}: Props) => (
  <ContentSection
    id='domain'
    title={translations.detailsPage.sectionTitles.concept.subjectAndApplication}
  >
    <KeyValueList>
      {subjectLabels && hasFieldSelectedLanguage(subjectLabels) && (
        <KeyValueListItem
          property={translations.concept.subject}
          value={languageSorter(subjectLabels).map((subjectLabel, index) => (
            <MultiLingualField
              key={index}
              languages={selectedLanguages}
              text={subjectLabel}
              useFallback={false}
            />
          ))}
        />
      )}
      {applications.length > 0 && hasFieldSelectedLanguage(applications) && (
        <KeyValueListItem
          property={translations.concept.application}
          value={languageSorter(applications).map((application, index) => (
            <MultiLingualField
              key={index}
              languages={selectedLanguages}
              text={application}
              useFallback={false}
            />
          ))}
        />
      )}
    </KeyValueList>
  </ContentSection>
);

export default SubjectAndApplication;

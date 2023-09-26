import React from 'react';
import { ContentSection } from '../../../components/details-page';
import translations from '../../../lib/localization';
import MultiLingualField from '../../../components/multilingual-field';
import { Language, TextLanguage } from '../../../types';

interface Props {
  example: Partial<TextLanguage>;
  selectedLanguages: Language[];
}

const Example = ({ example, selectedLanguages }: Props) => (
  <ContentSection
    id='example'
    title={translations.detailsPage.sectionTitles.concept.example}
  >
    <MultiLingualField languages={selectedLanguages} text={example} />
  </ContentSection>
);

export default Example;

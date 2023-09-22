import React from 'react';
import { ContentSection } from '../../../components/details-page';
import translations from '../../../lib/localization';
import MultiLingualField from '../../../components/multilingual-field';
import { Language, TextLanguage } from '../../../types';

interface Props {
  remark: Partial<TextLanguage>;
  selectedLanguages: Language[];
}

const Remark = ({ remark, selectedLanguages }: Props) => (
  <ContentSection
    id='remark'
    title={translations.detailsPage.sectionTitles.concept.remark}
  >
    <MultiLingualField
      languages={selectedLanguages}
      text={remark}
      convertToMarkUp
    />
  </ContentSection>
);

export default Remark;

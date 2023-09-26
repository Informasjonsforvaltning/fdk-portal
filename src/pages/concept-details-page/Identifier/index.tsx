import React from 'react';
import { ContentSection } from '../../../components/details-page';
import translations from '../../../lib/localization';

interface Props {
  identifier: string;
}

const Identifier = ({ identifier }: Props) => (
  <ContentSection
    id='identifier'
    title={translations.detailsPage.sectionTitles.concept.identifier}
  >
    {identifier}
  </ContentSection>
);

export default Identifier;

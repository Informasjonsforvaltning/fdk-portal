import React from 'react';
import {
  ContentSection,
  KeyValueList,
  KeyValueListItem
} from '../../../components/details-page';
import translations from '../../../lib/localization';
import { formatISO } from '../../../utils/date';

interface Props {
  created: string;
}

const Created = ({ created }: Props) => (
  <ContentSection
    id='concept-info'
    title={translations.detailsPage.sectionTitles.concept.conceptInfo}
    truncate
  >
    {created && (
      <KeyValueList>
        <KeyValueListItem
          property={`${translations.dateCreated}:`}
          value={formatISO(created)}
        />
      </KeyValueList>
    )}
  </ContentSection>
);

export default Created;

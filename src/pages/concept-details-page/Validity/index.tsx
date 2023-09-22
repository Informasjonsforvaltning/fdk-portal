import React from 'react';
import {
  ContentSection,
  KeyValueList,
  KeyValueListItem
} from '../../../components/details-page';
import translations from '../../../lib/localization';

interface Props {
  validFromIncluding: string;
  validToIncluding: string;
}

const Validity = ({ validFromIncluding, validToIncluding }: Props) => (
  <ContentSection
    id='validity'
    title={translations.detailsPage.sectionTitles.concept.validity}
  >
    <KeyValueList>
      {(validFromIncluding || validToIncluding) && (
        <KeyValueListItem
          property={translations.concept.valid}
          value={`${
            validFromIncluding
              ? `${translations.concept.from} ${validFromIncluding} `
              : ''
          }${
            validToIncluding
              ? `${translations.concept.to} ${validToIncluding}`
              : ''
          }`}
        />
      )}
    </KeyValueList>
  </ContentSection>
);

export default Validity;

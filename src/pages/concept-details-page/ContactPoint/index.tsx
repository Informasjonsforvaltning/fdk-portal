import React from 'react';
import {
  ContentSection,
  KeyValueList,
  KeyValueListItem
} from '../../../components/details-page';
import translations from '../../../lib/localization';
import { ConceptContactPoint } from '../../../types';

interface Props {
  contactPoint: Partial<ConceptContactPoint>;
}

const ContactPoint = ({ contactPoint }: Props) => (
  <ContentSection
    id='contact-information'
    title={translations.detailsPage.sectionTitles.concept.contactInformation}
  >
    <KeyValueList>
      {contactPoint.email && (
        <KeyValueListItem
          property={translations.email}
          value={
            <a
              title={contactPoint.email}
              href={`mailto:${contactPoint.email}`}
              rel='noopener noreferrer'
            >
              {contactPoint.email}
            </a>
          }
        />
      )}
      {contactPoint.telephone && (
        <KeyValueListItem
          property={translations.phone}
          value={contactPoint.telephone}
        />
      )}
    </KeyValueList>
  </ContentSection>
);

export default ContactPoint;

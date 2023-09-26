import React from 'react';
import Link from '@fellesdatakatalog/link';
import { ContentSection } from '../../../components/details-page';
import translations from '../../../lib/localization';

interface Props {
  range: string;
  rangeUri: string;
}

const Range = ({ range, rangeUri }: Props) => (
  <ContentSection
    id='range'
    title={translations.detailsPage.sectionTitles.concept.range}
  >
    <Link href={rangeUri} external>
      {range}
    </Link>
  </ContentSection>
);

export default Range;

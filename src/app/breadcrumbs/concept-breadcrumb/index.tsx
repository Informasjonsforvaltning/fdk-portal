import React, { memo, FC } from 'react';
import { compose } from 'redux';

import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';
import { getTranslateText as translate } from '../../../lib/translateText';
import localization from '../../../lib/localization';
import { buildSearchUrl, SearchSet } from '../../../lib/search-url';

import withConcept, {
  Props as ConceptProps
} from '../../../components/with-concept';

interface Props extends ConceptProps {}

const ConceptBreadcrumb: FC<Props> = ({ concept }) => (
  <>
    <a href={buildSearchUrl(SearchSet.CONCEPTS)}>{localization.page.termTab}</a>
    <ChevronUpIcon className='fdk-path-chevron' />
    <span>
      {translate(concept?.prefLabel ?? localization.breadcrumb.notFound)}
    </span>
  </>
);

export default compose<FC>(memo, withConcept)(ConceptBreadcrumb);

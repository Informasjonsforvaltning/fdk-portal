import React, { memo, FC } from 'react';
import { compose } from 'redux';

import { Link } from 'react-router-dom';
import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';
import { getTranslateText as translate } from '../../../lib/translateText';
import translations from '../../../lib/localization';

import withConcept, {
  Props as ConceptProps
} from '../../../components/with-concept';
import localization from '../../../lib/localization';

interface Props extends ConceptProps {}

const ConceptBreadcrumb: FC<Props> = ({ concept }) => (
  <>
    <Link to='/concepts'>{localization.page.termTab}</Link>
    <ChevronUpIcon className='fdk-path-chevron' />
    <span>
      {translate(concept?.prefLabel ?? translations.breadcrumb.notFound)}
    </span>
  </>
);

export default compose<FC>(memo, withConcept)(ConceptBreadcrumb);

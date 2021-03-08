import React, { memo, FC } from 'react';
import { compose } from 'redux';

import { getTranslateText as translate } from '../../../lib/translateText';
import translations from '../../../lib/localization';

import withConcept, {
  Props as ConceptProps
} from '../../../components/with-concept';

interface Props extends ConceptProps {}

const ConceptBreadcrumb: FC<Props> = ({ concept }) => (
  <span>
    {translate(concept?.prefLabel ?? translations.breadcrumb.notFound)}
  </span>
);

export default compose<FC>(memo, withConcept)(ConceptBreadcrumb);

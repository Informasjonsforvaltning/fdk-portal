import React, { FC } from 'react';

import { getTranslateText as translate } from '../../../lib/translateText';
import translations from '../../../lib/localization';

const SparqlPageBreadcrumb: FC = () => (
  <span>{translate(translations.breadcrumb.sparql)}</span>
);

export default SparqlPageBreadcrumb;

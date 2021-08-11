import React, { memo, FC, Suspense } from 'react';
import { compose } from 'redux';

import env from '../../env';
import SC from './styled';

// eslint-disable-next-line import/no-unresolved
const SparqlGui = React.lazy(() => import('sparql_gui/SparqlGui'));
const { FDK_SPARQL_API_BASE_URI } = env;

interface Props {
  language: any;
}

const SparqlPage: FC<Props> = ({ language }) => (
  <SC.SparqlPage className='container'>
    <Suspense fallback={null}>
      <SparqlGui language={language} endpoint={FDK_SPARQL_API_BASE_URI} />
    </Suspense>
  </SC.SparqlPage>
);

export default compose<FC<Props>>(memo)(SparqlPage);

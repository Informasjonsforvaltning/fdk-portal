import React, { memo, FC, Suspense } from 'react';
import { compose } from 'redux';

import SC from './styled';

// eslint-disable-next-line import/no-unresolved
const SparqlGui = React.lazy(() => import('sparql_gui/SparqlGui'));

interface Props {
  language: any;
}

const SparqlPage: FC<Props> = ({ language }) => (
  <SC.SparqlPage className='container'>
    <Suspense fallback={null}>
      <SparqlGui language={language} />
    </Suspense>
  </SC.SparqlPage>
);

export default compose<FC<Props>>(memo)(SparqlPage);

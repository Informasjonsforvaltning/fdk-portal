import React from 'react';
import Banner from '../../components/banner';
import localization from '../../lib/localization';

const RequestsPage = () => (
  <main id='content' className='container'>
    <Banner title={localization.page.requests} />
  </main>
);
export default RequestsPage;

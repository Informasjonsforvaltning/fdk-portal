import { compose } from 'redux';

import withOrganizations from '../../components/with-organizations';
import OrganizationsPagePure from './organizations-page-pure';

const enhance = compose(withOrganizations);

export const OrganizationsPage = enhance(OrganizationsPagePure);

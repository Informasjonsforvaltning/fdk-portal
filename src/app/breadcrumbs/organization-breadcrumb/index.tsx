import React, { memo, FC } from 'react';
import { compose } from 'redux';

import withOrganization, {
  Props as OrganizationProps
} from '../../../components/with-organization';

import { getTranslateText as translate } from '../../../lib/translateText';
import translations from '../../../lib/localization';

interface Props extends OrganizationProps {}

const OrganizationBreadcrumb: FC<Props> = ({ organization }) => (
  <span>
    {translate(organization?.prefLabel) ||
      organization?.name ||
      translate(translations.breadcrumb.notFound)}
  </span>
);

export default compose<FC>(memo, withOrganization)(OrganizationBreadcrumb);

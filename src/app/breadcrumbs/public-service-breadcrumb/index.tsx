import React, { memo, FC } from 'react';
import { compose } from 'redux';

import withPublicService, {
  Props as PublicServiceProps
} from '../../../components/with-public-service';

import { getTranslateText as translate } from '../../../lib/translateText';
import translations from '../../../lib/localization';

interface Props extends PublicServiceProps {}

const PublicServiceBreadcrumb: FC<Props> = ({ publicService }) => (
  <span>
    {translate(publicService?.title ?? translations.breadcrumb.notFound)}
  </span>
);

export default compose<FC>(memo, withPublicService)(PublicServiceBreadcrumb);

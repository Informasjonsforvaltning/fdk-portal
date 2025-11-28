import React, { memo, FC } from 'react';
import { compose } from 'redux';

import { Link } from 'react-router-dom';
import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';
import withPublicService, {
  Props as PublicServiceProps
} from '../../../components/with-public-service';

import { getTranslateText as translate } from '../../../lib/translateText';
import localization from '../../../lib/localization';

interface Props extends PublicServiceProps {}

const PublicServiceBreadcrumb: FC<Props> = ({ publicService }) => (
  <>
    <Link to='/public-services-and-events'>{localization.page.serviceTab}</Link>
    <ChevronUpIcon className='fdk-path-chevron' />
    <span>
      {translate(publicService?.title ?? localization.breadcrumb.notFound)}
    </span>
  </>
);

export default compose<FC>(memo, withPublicService)(PublicServiceBreadcrumb);

import React, { memo, FC } from 'react';
import { compose } from 'redux';

import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';
import withPublicService, {
  Props as PublicServiceProps
} from '../../../components/with-public-service';

import { getTranslateText as translate } from '../../../lib/translateText';
import localization from '../../../lib/localization';
import { buildSearchUrl, SearchSet } from '../../../lib/search-url';

interface Props extends PublicServiceProps {}

const PublicServiceBreadcrumb: FC<Props> = ({ publicService }) => (
  <>
    <a href={buildSearchUrl(SearchSet.SERVICES_AND_EVENTS)}>
      {localization.page.serviceTab}
    </a>
    <ChevronUpIcon className='fdk-path-chevron' />
    <span>
      {translate(publicService?.title ?? localization.breadcrumb.notFound)}
    </span>
  </>
);

export default compose<FC>(memo, withPublicService)(PublicServiceBreadcrumb);

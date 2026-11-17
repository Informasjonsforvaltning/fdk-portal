import React, { memo, FC } from 'react';
import { compose } from 'redux';

import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';
import { getTranslateText as translate } from '../../../lib/translateText';
import localization from '../../../lib/localization';
import { buildSearchUrl, SearchSet } from '../../../lib/search-url';

import withDataService, {
  Props as DataServiceProps
} from '../../../components/with-data-service';

interface Props extends DataServiceProps {}

const DataServiceBreadcrumb: FC<Props> = ({ dataService }) => (
  <>
    <a href={buildSearchUrl(SearchSet.DATA_SERVICES)}>
      {localization.page.apiTab}
    </a>
    <ChevronUpIcon className='fdk-path-chevron' />
    <span>
      {translate(dataService?.title ?? localization.breadcrumb.notFound)}
    </span>
  </>
);

export default compose<FC>(memo, withDataService)(DataServiceBreadcrumb);

import React, { memo, FC } from 'react';
import { compose } from 'redux';

import { Link } from 'react-router-dom';
import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';
import { getTranslateText as translate } from '../../../lib/translateText';
import localization from '../../../lib/localization';

import withDataService, {
  Props as DataServiceProps
} from '../../../components/with-data-service';

interface Props extends DataServiceProps {}

const DataServiceBreadcrumb: FC<Props> = ({ dataService }) => (
  <>
    <Link to='/data-services'>{localization.page.apiTab}</Link>
    <ChevronUpIcon className='fdk-path-chevron' />
    <span>
      {translate(dataService?.title ?? localization.breadcrumb.notFound)}
    </span>
  </>
);

export default compose<FC>(memo, withDataService)(DataServiceBreadcrumb);

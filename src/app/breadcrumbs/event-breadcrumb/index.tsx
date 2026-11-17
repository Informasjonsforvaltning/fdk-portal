import React, { memo, FC } from 'react';
import { compose } from 'redux';
import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';

import withEvent, { Props as EventProps } from '../../../components/with-event';

import { getTranslateText as translate } from '../../../lib/translateText';
import localization from '../../../lib/localization';
import { buildSearchUrl, SearchSet } from '../../../lib/search-url';

interface Props extends EventProps {}

const EventBreadcrumb: FC<Props> = ({ event }) => (
  <>
    <a href={buildSearchUrl(SearchSet.SERVICES_AND_EVENTS)}>
      {localization.page.serviceTab}
    </a>
    <ChevronUpIcon className='fdk-path-chevron' />
    <span>{translate(event?.title) ?? localization.breadcrumb.notFound}</span>
  </>
);

export default compose<FC>(memo, withEvent)(EventBreadcrumb);

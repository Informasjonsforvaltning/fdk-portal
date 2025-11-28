import React, { memo, FC } from 'react';
import { compose } from 'redux';
import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';

import { Link } from 'react-router-dom';
import withEvent, { Props as EventProps } from '../../../components/with-event';

import { getTranslateText as translate } from '../../../lib/translateText';
import localization from '../../../lib/localization';

interface Props extends EventProps {}

const EventBreadcrumb: FC<Props> = ({ event }) => (
  <>
    <Link to='/public-services-and-events'>{localization.page.serviceTab}</Link>
    <ChevronUpIcon className='fdk-path-chevron' />
    <span>{translate(event?.title) ?? localization.breadcrumb.notFound}</span>
  </>
);

export default compose<FC>(memo, withEvent)(EventBreadcrumb);

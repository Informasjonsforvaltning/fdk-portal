import React, { memo, FC } from 'react';
import { compose } from 'redux';

import withEvent, { Props as EventProps } from '../../../components/with-event';

import { getTranslateText as translate } from '../../../lib/translateText';
import translations from '../../../lib/localization';

interface Props extends EventProps {}

const EventBreadcrumb: FC<Props> = ({ event }) => (
  <span>{translate(event?.title) ?? translations.breadcrumb.notFound}</span>
);

export default compose<FC>(memo, withEvent)(EventBreadcrumb);

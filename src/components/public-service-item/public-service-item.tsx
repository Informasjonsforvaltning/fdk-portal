import React, { FC, useEffect } from 'react';
import { compose } from 'redux';

import { PublicService } from '../../types';
import { SearchTypes } from '../../types/enums';
import { SearchHit, SearchHitEvents } from '../search-hit/search-hit';
import { RoundedTag } from '../rounded-tag/rounded-tag.component';
import { patchSearchQuery } from '../../lib/addOrReplaceUrlParam';
import { getTranslateText as translate } from '../../lib/translateText';
import withEvents, { Props as EventsProps } from '../with-events';

interface ExternalProps {
  publicService: Partial<PublicService>;
}

interface Props extends ExternalProps, EventsProps {}

const PublicServiceItemPure: FC<Props> = ({
  publicService: {
    id = '',
    title = {},
    description = {},
    hasCompetentAuthority = [],
    isGroupedBy = []
  },
  events,
  eventsActions: { getEventsRequested: getEvents }
}) => {
  useEffect(() => {
    if (events.length === 0) {
      getEvents({ size: 1000 });
    }
  }, []);

  const eventsMap = events?.reduce(
    (previous, current) => ({ ...previous, [current.uri]: current }),
    {} as Record<string, any>
  );

  return (
    <SearchHit
      id={id}
      type={SearchTypes.publicService}
      title={title}
      publisher={hasCompetentAuthority?.[0]}
      description={description}
      beta
    >
      <SearchHitEvents>
        {isGroupedBy.map(uri => {
          return (
            <RoundedTag key={uri} to={patchSearchQuery('event', uri)}>
              <span>{translate(eventsMap?.[uri]?.title) ?? uri}</span>
            </RoundedTag>
          );
        })}
      </SearchHitEvents>
    </SearchHit>
  );
};

export const PublicServiceItem = compose<FC<ExternalProps>>(withEvents)(
  PublicServiceItemPure
);

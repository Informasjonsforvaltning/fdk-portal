import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

import translations from '../../lib/localization';
import { getTranslateText as translate } from '../../lib/translateText';
import { dateStringToDate, formatDate } from '../../lib/date-utils';

import { themeFDK } from '../../app/theme';

import withEvent, { Props as EventProps } from '../with-event';

import DetailsPage, {
  ContentSection,
  KeyValueList,
  KeyValueListItem
} from '../details-page';

import type { Theme } from '../../types';
import { Entity } from '../../types/enums';

import { PATHNAME_PUBLIC_SERVICES } from '../../constants/constants';
import SC from './styled';

interface RouteParams {
  eventId: string;
}

interface Props extends RouteComponentProps<RouteParams>, EventProps {}

const EventDetailsPage: FC<Props> = ({
  match: {
    params: { eventId }
  },
  event,
  eventActions: { getEventRequested: getEvent }
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const entity = Entity.EVENT;
  const theme = { entityColours: themeFDK.extendedColors[entity] };

  useEffect(() => {
    if (event?.id !== eventId) {
      getEvent(eventId);
    }

    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, [eventId]);

  const title = translate(event?.title);
  const description = translate(event?.description);
  const lastPublished = formatDate(
    dateStringToDate(event?.harvest?.firstHarvested)
  );
  const themes: Theme[] = [];
  const relatedServices = event?.relatedService ?? [];
  const eventTypes = event?.eventType ?? [];

  return isMounted
    ? event && (
        <ThemeProvider theme={theme}>
          <SC.BetaRibbon>BETA</SC.BetaRibbon>
          <DetailsPage
            entity={entity}
            title={title}
            publisher={event?.hasCompetentAuthority?.[0]}
            entityId={event?.id}
            entityUri={event?.uri}
            lastPublished={lastPublished}
            isAuthoritative={false}
            isOpenData={false}
            isPublicData={false}
            isRestrictedData={false}
            isNonPublicData={false}
            themes={themes}
          >
            {description && (
              <ContentSection
                id="description"
                title={translations.detailsPage.sectionTitles.event.description}
              >
                {description}
              </ContentSection>
            )}
            {eventTypes.length > 0 && (
              <ContentSection
                id="usage"
                title={translations.detailsPage.sectionTitles.event.usage}
              >
                <KeyValueList>
                  <KeyValueListItem
                    property={translations.eventType}
                    value={eventTypes
                      ?.map(({ prefLabel }) => translate(prefLabel))
                      .filter(Boolean)
                      .join(', ')}
                  />
                </KeyValueList>
              </ContentSection>
            )}
            {relatedServices.length > 0 && (
              <ContentSection
                id="relatedServices"
                title={
                  translations.detailsPage.sectionTitles.event.relatedServices
                }
                boxStyle
                iconEntity={Entity.PUBLIC_SERVICE}
              >
                <KeyValueListItem
                  property={null}
                  value={relatedServices.map(({ uri, title, id }, index) =>
                    uri && title && id ? (
                      <SC.ListItemValue key={`${uri}-${index}`}>
                        <Link
                          as={RouterLink}
                          to={`${PATHNAME_PUBLIC_SERVICES}/${id}`}
                        >
                          {translate(title)}
                        </Link>
                      </SC.ListItemValue>
                    ) : null
                  )}
                />
              </ContentSection>
            )}
          </DetailsPage>
        </ThemeProvider>
      )
    : null;
};

export default compose(memo, withEvent)(EventDetailsPage);

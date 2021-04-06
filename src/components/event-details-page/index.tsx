import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import parse from 'html-react-parser';
import Link from '@fellesdatakatalog/link';

import translations from '../../lib/localization';
import { getTranslateText as translate } from '../../lib/translateText';
import { dateStringToDate, formatDate } from '../../lib/date-utils';
import { convertToSanitizedHtml } from '../../lib/markdown-converter';

import { themeFDK } from '../../app/theme';

import withEvent, { Props as EventProps } from '../with-event';
import withPublicServices, {
  Props as PublicServicesProps
} from '../with-public-services';
import withErrorBoundary from '../with-error-boundary';

import DetailsPage, {
  ContentSection,
  KeyValueList,
  KeyValueListItem
} from '../details-page';
import ErrorPage from '../error-page';
import RelationList from '../relation-list';

import type { Theme } from '../../types';
import { Entity, SpecializedEventType } from '../../types/enums';

import { PATHNAME_PUBLIC_SERVICES } from '../../constants/constants';
import SC from './styled';

interface RouteParams {
  eventId: string;
}

interface Props
  extends RouteComponentProps<RouteParams>,
    EventProps,
    PublicServicesProps {}

const EventDetailsPage: FC<Props> = ({
  match: {
    params: { eventId }
  },
  event,
  isLoadingEvent,
  eventActions: { getEventRequested: getEvent },
  publicServices,
  publicServicesRelations,
  publicServicesActions: {
    getPublicServicesRequested: getPublicServices,
    resetPublicServices,
    getPublicServicesRelationsRequested: getPublicServicesRelations,
    resetPublicServicesRelations
  }
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const entity = Entity.EVENT;
  const theme = { entityColours: themeFDK.extendedColors[entity] };

  const renderPage = isLoadingEvent || !isMounted || event != null;

  useEffect(() => {
    if (event?.id !== eventId) {
      getEvent(eventId);
    }

    getPublicServices({ size: 1000 });
    setIsMounted(true);

    return () => {
      setIsMounted(false);
      resetPublicServices();
    };
  }, []);

  useEffect(() => {
    if (event?.uri) {
      getPublicServicesRelations({ isGroupedBy: event.uri });
    }
    return () => {
      resetPublicServicesRelations();
    };
  }, [event?.uri]);

  const title = event?.title ?? {};
  const description = translate(event?.description);
  const lastPublished = formatDate(
    dateStringToDate(event?.harvest?.firstHarvested)
  );
  const themes: Theme[] = [];
  const relation = new Set(event?.relation ?? []);
  const relatedServices = publicServices.filter(({ uri }) => relation.has(uri));
  const dctTypes = event?.dctType ?? [];
  const specializedType = event?.specialized_type;

  return renderPage ? (
    event && (
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
              id='description'
              title={translations.detailsPage.sectionTitles.event.description}
              entityTheme={entity}
              truncate
            >
              {parse(convertToSanitizedHtml(description))}
            </ContentSection>
          )}
          {(dctTypes.length > 0 || specializedType) && (
            <ContentSection
              id='usage'
              title={translations.detailsPage.sectionTitles.event.usage}
            >
              <KeyValueList>
                {dctTypes.length > 0 && (
                  <KeyValueListItem
                    property={translations.dctType}
                    value={dctTypes
                      ?.map(({ prefLabel }) => translate(prefLabel))
                      .filter(Boolean)
                      .join(', ')}
                  />
                )}
                {specializedType && (
                  <KeyValueListItem
                    property={translations.eventType}
                    value={(() => {
                      switch (specializedType) {
                        case SpecializedEventType.LIFEEVENT:
                          return translations.lifeEvent;
                        case SpecializedEventType.BUSINESSEVENT:
                          return translations.businessEvent;
                        default:
                          return '';
                      }
                    })()}
                  />
                )}
              </KeyValueList>
            </ContentSection>
          )}
          {relatedServices.length > 0 && (
            <ContentSection
              id='relatedServices'
              title={
                translations.detailsPage.sectionTitles.event.relatedServices
              }
              boxStyle
              entityIcon={Entity.PUBLIC_SERVICE}
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
          {publicServicesRelations.length > 0 && (
            <ContentSection
              id='relationList'
              title={translations.detailsPage.relationList.title.event}
            >
              <RelationList
                parentIdentifier={event.uri}
                publicServices={publicServicesRelations}
              />
            </ContentSection>
          )}
        </DetailsPage>
      </ThemeProvider>
    )
  ) : (
    <ErrorPage errorCode='404' />
  );
};

export default compose(
  memo,
  withEvent,
  withPublicServices,
  withErrorBoundary(ErrorPage)
)(EventDetailsPage);

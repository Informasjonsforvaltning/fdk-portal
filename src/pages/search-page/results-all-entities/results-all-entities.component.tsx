import React, { FC, memo, PropsWithChildren, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import keyBy from 'lodash/keyBy';

import env from '../../../env';

import localization from '../../../lib/localization';
import { parseSearchParams } from '../../../lib/location-history-helper';
import { getLosByKeys } from '../../../lib/los/los-helper';
import { setPage } from '../search-location-helper';

import withOrganizations, {
  Props as OrganizationsProps
} from '../../../components/with-organizations-catalog';
import withReferenceData, {
  Props as ReferenceDataProps
} from '../../../components/with-reference-data';
import withEvents, {
  Props as EventsProps
} from '../../../components/with-events';

import SearchEntities from '../../../components/search-entities/search-entities.component';
import EmptyHits from '../../../components/empty-hits/empty.component';

import Filters from '../filters';
import CompareList from '../compare-list';
import SortButtons from '../sort-buttons';

import SC from './styled';

import type { Entity as EntityType, Concept } from '../../../types';
import { Entity, FeedType } from '../../../types/enums';

const { SEARCH_API_HOST } = env;

interface ExternalProps {
  entities: Partial<EntityType>[];
  entityType?: Entity;
  aggregations?: any;
  page?: any;
  compareConceptList?: Concept[];
  addConcept?: (concept: Partial<Concept>) => void;
  removeConcept?: (id?: string) => void;
}
interface Props
  extends ExternalProps,
    OrganizationsProps,
    EventsProps,
    RouteComponentProps<any>,
    ReferenceDataProps {}

const ResultsPage: FC<PropsWithChildren<Props>> = ({
  entities = [],
  entityType,
  aggregations = {},
  page = {},
  compareConceptList = [],
  addConcept,
  removeConcept = () => {},
  history,
  location,
  organizations = [],
  organizationsActions: { getOrganizationsCatalogRequested: getOrganizations },
  referenceData: { los = [], themes = [], mediatypes = [] },
  referenceDataActions: { getReferenceDataRequested: getReferenceData },
  events,
  eventsActions: { getEventsRequested: getEvents }
}) => {
  useEffect(() => {
    if (los.length === 0) {
      getReferenceData('los');
    }
    if (themes.length === 0) {
      getReferenceData('themes');
    }
    if (mediatypes.length === 0) {
      getReferenceData('mediatypes');
    }
    if (organizations.length === 0) {
      getOrganizations();
    }
    if (events.length === 0) {
      getEvents({ size: 1000 });
    }
  }, []);

  const searchParams = parseSearchParams(location);
  const { page: pageSearchParam = 0 } = searchParams;
  const { totalPages } = page;

  const onPageChange = (data: any) => {
    setPage(history, location, data.selected);
    window.scrollTo(0, 0);
  };

  return (
    <main id="content">
      {entities && entities.length > 0 ? (
        <>
          <div className="row">
            <SortButtons />
          </div>
          <SC.Content className="row">
            <SC.Filters className="col-lg-4">
              <span className="uu-invisible" aria-hidden="false">
                {localization.filter}
              </span>
              <Filters
                aggregations={aggregations}
                themesItems={keyBy(themes, 'code')}
                publishers={keyBy(organizations, 'orgPath')}
                losItems={getLosByKeys(los)}
                mediaTypes={mediatypes}
                events={events}
              />
              <CompareList
                conceptsCompareList={compareConceptList}
                removeConcept={removeConcept}
              />
            </SC.Filters>
            <section className="col-12 col-lg-8">
              <SearchEntities
                entities={entities}
                compareConceptList={compareConceptList}
                addConcept={addConcept}
                removeConcept={removeConcept}
                mediatypes={mediatypes}
              />
              <SC.Pagination>
                <span className="uu-invisible" aria-hidden="false">
                  Sidepaginering.
                </span>
                <ReactPaginate
                  pageCount={parseInt(totalPages || 0, 10)}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  previousLabel={localization.page.prev}
                  nextLabel={localization.page.next}
                  breakLabel={<span>...</span>}
                  breakClassName="break-me"
                  containerClassName="pagination"
                  onPageChange={onPageChange}
                  activeClassName="active"
                  forcePage={parseInt(pageSearchParam?.toString(), 10)}
                  disableInitialCallback
                />
                {entityType === Entity.DATASET && (
                  <SC.FeedLinks>
                    {[FeedType.RSS, FeedType.ATOM].map(type => (
                      <SC.FeedLink
                        href={`${SEARCH_API_HOST}/datasets.${type}${location.search}`}
                      >
                        {localization.feedType[type]}
                        <SC.FeedIcon />
                      </SC.FeedLink>
                    ))}
                  </SC.FeedLinks>
                )}
              </SC.Pagination>
            </section>
          </SC.Content>
        </>
      ) : (
        <div className="row">
          <div className="col-12">
            <EmptyHits />
          </div>
        </div>
      )}
    </main>
  );
};

export default compose<FC<ExternalProps>>(
  memo,
  withOrganizations,
  withReferenceData,
  withEvents,
  withRouter
)(ResultsPage);

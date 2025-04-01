import _ from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { compose } from 'redux';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

import {
  SearchBox,
  SearchBoxHeader,
  SC as SearchBoxSC
} from '../../components/search-box/search-box';

import { getConfig } from '../../config';

import './search-page.scss';
import {
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_SEARCH,
  HITS_PER_PAGE,
  PATHNAME_PUBLIC_SERVICES_AND_EVENTS
} from '../../constants/constants';
import translations from '../../lib/localization';
import { parseSearchParams } from '../../lib/location-history-helper';
import { Tabs } from './tabs/tabs';
import ResultsPage from './results-all-entities/results-all-entities.component';
import TransportPortalLogos from '../../components/transport-portal-logos';
import withPublicServicesAndEvents, {
  Props as PublicServicesAndEventsProps
} from '../../components/with-public-services-and-events';
import { generateQueryKey, shouldFetch } from './lib/fetch-helper';

import type { SearchObject } from '../../types';
import localization from '../../lib/localization';

interface AllEntities {
  hits: Partial<SearchObject>[];
  page: any;
  aggregations: any;
}

interface Props extends PublicServicesAndEventsProps, RouteComponentProps {
  fetchDatasetsIfNeeded: (params: any) => void;
  fetchDataServicesIfNeeded: (params: any) => void;
  fetchConceptsIfNeeded: (params: any) => void;
  fetchInformationModelsIfNeeded: (params: any) => void;
  datasetItems: Partial<SearchObject>[];
  datasetAggregations: any;
  datasetTotal: any;
  dataServiceItems: Partial<SearchObject>[];
  dataServiceAggregations: any;
  dataServiceTotal: any;
  conceptItems: Partial<SearchObject>[];
  conceptAggregations: any;
  conceptTotal: any;
  informationModelItems: Partial<SearchObject>[];
  informationModelAggregations: any;
  informationModelTotal: any;
  conceptsCompare: any;
  addConcept: (concept: Partial<SearchObject>) => void;
  removeConcept: (id?: string | undefined) => void;
  searchAllEntities: AllEntities;
  isFetchingDatasets: boolean;
  isFetchingDataservices: boolean;
  isFetchingConcepts: boolean;
  isFetchingInformationModels: boolean;
}

const SearchPage: FC<Props> = ({
  fetchDatasetsIfNeeded,
  fetchDataServicesIfNeeded,
  fetchConceptsIfNeeded,
  fetchInformationModelsIfNeeded,
  datasetItems,
  datasetAggregations,
  datasetTotal,
  dataServiceItems,
  dataServiceAggregations,
  dataServiceTotal,
  conceptItems,
  conceptAggregations,
  conceptTotal,
  informationModelItems,
  informationModelAggregations,
  informationModelTotal,
  location,
  conceptsCompare,
  addConcept,
  removeConcept,
  searchAllEntities,
  publicServicesAndEvents,
  publicServicesAndEventsAggregations,
  publicServicesAndEventsPage,
  publicServicesAndEventsActions: {
    getPublicServicesAndEventsRequested: getPublicServicesAndEvents
  },
  isFetchingDatasets,
  isFetchingDataservices,
  isFetchingConcepts,
  isFetchingInformationModels
}) => {
  const [searchQuery, setSearchQuery] = useState('#');
  const {
    hits: searchAllEntitiesHits,
    page: searchAllEntitiesPage,
    aggregations: allResultsEntititesAggregations
  } = searchAllEntities || {};

  const locationSearch = parseSearchParams(location);
  const locationSearchParamQ = _.pick(locationSearch, 'q');

  const datasetSearchParams =
    location.pathname === PATHNAME_DATASETS
      ? locationSearch
      : locationSearchParamQ;
  const dataServiceSearchParams =
    location.pathname === PATHNAME_DATA_SERVICES
      ? locationSearch
      : locationSearchParamQ;
  const conceptSearchParams =
    location.pathname === PATHNAME_CONCEPTS
      ? locationSearch
      : locationSearchParamQ;
  const informationModelSearchParams =
    location.pathname === PATHNAME_INFORMATIONMODELS
      ? locationSearch
      : locationSearchParamQ;
  const publicServiceSearchParams =
    location.pathname === PATHNAME_PUBLIC_SERVICES_AND_EVENTS
      ? locationSearch
      : locationSearchParamQ;

  const isLoading =
    isFetchingDatasets ||
    isFetchingDataservices ||
    isFetchingConcepts ||
    isFetchingInformationModels;

  useEffect(() => {
    fetchDatasetsIfNeeded(datasetSearchParams);
    fetchDataServicesIfNeeded(dataServiceSearchParams);
    fetchConceptsIfNeeded(conceptSearchParams);
    fetchInformationModelsIfNeeded(informationModelSearchParams);
  }, [
    datasetSearchParams,
    dataServiceSearchParams,
    conceptSearchParams,
    informationModelSearchParams
  ]);

  useEffect(() => {
    if (shouldFetch(publicServiceSearchParams, searchQuery)) {
      getPublicServicesAndEvents(publicServiceSearchParams);
      setSearchQuery(generateQueryKey(publicServiceSearchParams));
    }
  }, [publicServiceSearchParams]);

  return (
    <div>
      {!getConfig().isNapProfile && (
        <SearchBox placeholder={localization.query.intro} autosuggest>
          <Tabs />
        </SearchBox>
      )}
      {getConfig().isNapProfile && (
        <SearchBox placeholder={localization.query.intro} autosuggest>
          <SearchBoxHeader>
            <SearchBoxSC.SearchBox.SearchHeaderLogosTitle>
              {translations.collaborationBetween}
            </SearchBoxSC.SearchBox.SearchHeaderLogosTitle>
            <TransportPortalLogos />
          </SearchBoxHeader>
        </SearchBox>
      )}
      <div className='container'>
        <Switch>
          <Route exact path={PATHNAME_SEARCH}>
            <ResultsPage
              isLoading={isLoading}
              entities={searchAllEntitiesHits}
              aggregations={allResultsEntititesAggregations}
              page={searchAllEntitiesPage}
              searchHitCount={
                searchAllEntitiesPage.totalElements > 9999
                  ? '10,000+'
                  : searchAllEntitiesPage.totalElements
              }
            />
          </Route>
          <Route exact path={PATHNAME_DATASETS}>
            <ResultsPage
              isLoading={isLoading}
              entities={datasetItems}
              aggregations={datasetAggregations}
              page={{
                totalPages: Math.ceil((datasetTotal || 1) / HITS_PER_PAGE)
              }}
              searchHitCount={datasetTotal ?? 0}
            />
          </Route>
          <Route exact path={PATHNAME_DATA_SERVICES}>
            <ResultsPage
              isLoading={isLoading}
              entities={dataServiceItems}
              aggregations={dataServiceAggregations}
              page={{
                totalPages: Math.ceil((dataServiceTotal || 1) / HITS_PER_PAGE)
              }}
              searchHitCount={dataServiceTotal ?? 0}
            />
          </Route>
          <Route exact path={PATHNAME_CONCEPTS}>
            <ResultsPage
              isLoading={isLoading}
              entities={conceptItems}
              aggregations={conceptAggregations}
              page={{
                totalPages: Math.ceil((conceptTotal || 1) / HITS_PER_PAGE)
              }}
              compareConceptList={conceptsCompare}
              addConcept={addConcept}
              removeConcept={removeConcept}
              searchHitCount={conceptTotal ?? 0}
            />
          </Route>
          <Route exact path={PATHNAME_INFORMATIONMODELS}>
            <ResultsPage
              isLoading={isLoading}
              entities={informationModelItems}
              aggregations={informationModelAggregations}
              page={{
                totalPages: Math.ceil(
                  (informationModelTotal || 1) / HITS_PER_PAGE
                )
              }}
              searchHitCount={informationModelTotal ?? 0}
            />
          </Route>
          <Route exact path={PATHNAME_PUBLIC_SERVICES_AND_EVENTS}>
            <ResultsPage
              isLoading={isLoading}
              entities={publicServicesAndEvents}
              aggregations={publicServicesAndEventsAggregations ?? {}}
              page={publicServicesAndEventsPage ?? {}}
              searchHitCount={publicServicesAndEventsPage?.totalElements || 0}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default compose<FC<Props>>(withPublicServicesAndEvents)(SearchPage);

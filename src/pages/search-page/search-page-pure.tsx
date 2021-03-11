import _ from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { compose } from 'redux';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

import {
  SearchBox,
  SearchBoxTitle
} from '../../components/search-box/search-box';

import { HitsStats } from './search-box/hits-stats/hits-stats.component';
import { getConfig } from '../../config';

import './search-page.scss';
import {
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_SEARCH,
  HITS_PER_PAGE,
  PATHNAME_PUBLIC_SERVICES
} from '../../constants/constants';
import { parseSearchParams } from '../../lib/location-history-helper';
import { Tabs } from './tabs/tabs';
import ResultsPage from './results-all-entities/results-all-entities.component';
import withPublicServicesAndEvents, {
  Props as PublicServicesAndEventsProps
} from '../../components/with-public-services-and-events';
import { generateQueryKey, shouldFetch } from './lib/fetch-helper';

import type {
  Concept,
  DataService,
  Dataset,
  InformationModel
} from '../../types';

interface AllEntities {
  hits:
    | Partial<Dataset>[]
    | Partial<DataService>[]
    | Partial<Concept>[]
    | Partial<InformationModel>[];
  page: any;
  aggregations: any;
}

interface Props extends PublicServicesAndEventsProps, RouteComponentProps {
  fetchDatasetsIfNeeded: (params: any) => void;
  fetchDataServicesIfNeeded: (params: any) => void;
  fetchConceptsIfNeeded: (params: any) => void;
  fetchInformationModelsIfNeeded: (params: any) => void;
  datasetItems: Partial<Dataset>[];
  datasetAggregations: any;
  datasetTotal: any;
  dataServiceItems: Partial<DataService>[];
  dataServiceAggregations: any;
  dataServiceTotal: any;
  conceptItems: Partial<Concept>[];
  conceptAggregations: any;
  conceptTotal: any;
  informationModelItems: Partial<InformationModel>[];
  informationModelAggregations: any;
  informationModelTotal: any;
  conceptsCompare: any;
  addConcept: (concept: Partial<Concept>) => void;
  removeConcept: (id?: string | undefined) => void;
  searchAllEntities: AllEntities;
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
  }
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
    location.pathname === PATHNAME_PUBLIC_SERVICES
      ? locationSearch
      : locationSearchParamQ;

  useEffect(() => {
    if (shouldFetch(publicServiceSearchParams, searchQuery)) {
      getPublicServicesAndEvents(publicServiceSearchParams);
      setSearchQuery(generateQueryKey(publicServiceSearchParams));
    }
  }, [publicServiceSearchParams]);

  fetchDatasetsIfNeeded(datasetSearchParams);
  fetchDataServicesIfNeeded(dataServiceSearchParams);
  fetchConceptsIfNeeded(conceptSearchParams);
  fetchInformationModelsIfNeeded(informationModelSearchParams);

  return (
    <div>
      <section className='top-section-search mb-4 d-flex flex-column justify-content-between top-section-search--image'>
        <SearchBox>
          <SearchBoxTitle>
            <HitsStats
              countDatasets={datasetTotal}
              countApis={dataServiceTotal}
              countTerms={conceptTotal}
              countInformationModels={informationModelTotal}
            />
          </SearchBoxTitle>
          {!getConfig().themeNap && (
            <Tabs
              countResults={searchAllEntities?.page?.totalElements || 0}
              countDatasets={datasetTotal || 0}
              countConcepts={conceptTotal || 0}
              countApis={dataServiceTotal || 0}
              countInformationModels={informationModelTotal || 0}
              countPublicServices={
                publicServicesAndEventsPage?.totalElements || 0
              }
            />
          )}
        </SearchBox>
      </section>
      <div className='container'>
        <Switch>
          <Route exact path={PATHNAME_SEARCH}>
            <ResultsPage
              entities={searchAllEntitiesHits}
              aggregations={allResultsEntititesAggregations}
              page={searchAllEntitiesPage}
            />
          </Route>
          <Route exact path={PATHNAME_DATASETS}>
            <ResultsPage
              entities={datasetItems}
              aggregations={datasetAggregations}
              page={{
                totalPages: Math.ceil((datasetTotal || 1) / HITS_PER_PAGE)
              }}
            />
          </Route>
          <Route exact path={PATHNAME_DATA_SERVICES}>
            <ResultsPage
              entities={dataServiceItems}
              aggregations={dataServiceAggregations}
              page={{
                totalPages: Math.ceil((dataServiceTotal || 1) / HITS_PER_PAGE)
              }}
            />
          </Route>
          <Route exact path={PATHNAME_CONCEPTS}>
            <ResultsPage
              entities={conceptItems}
              aggregations={conceptAggregations}
              page={{
                totalPages: Math.ceil((conceptTotal || 1) / HITS_PER_PAGE)
              }}
              compareConceptList={conceptsCompare}
              addConcept={addConcept}
              removeConcept={removeConcept}
            />
          </Route>
          <Route exact path={PATHNAME_INFORMATIONMODELS}>
            <ResultsPage
              entities={informationModelItems}
              aggregations={informationModelAggregations}
              page={{
                totalPages: Math.ceil(
                  (informationModelTotal || 1) / HITS_PER_PAGE
                )
              }}
            />
          </Route>
          <Route exact path={PATHNAME_PUBLIC_SERVICES}>
            <ResultsPage
              entities={publicServicesAndEvents}
              aggregations={publicServicesAndEventsAggregations ?? {}}
              page={publicServicesAndEventsPage ?? {}}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default compose<FC<Props>>(withPublicServicesAndEvents)(SearchPage);

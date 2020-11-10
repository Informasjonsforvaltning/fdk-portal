import _ from 'lodash';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import cx from 'classnames';
import { detect } from 'detect-browser';

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
  HITS_PER_PAGE
} from '../../constants/constants';
import { parseSearchParams } from '../../lib/location-history-helper';
import {
  getLosStructure,
  getThemesStructure,
  REFERENCEDATA_PATH_APISTATUS,
  REFERENCEDATA_PATH_DISTRIBUTIONTYPE,
  REFERENCEDATA_PATH_LOS,
  REFERENCEDATA_PATH_MEDIATYPES,
  REFERENCEDATA_PATH_THEMES
} from '../../redux/modules/referenceData';
import { Tabs } from './tabs/tabs';
import ResultsPage from './results-all-entities/results-all-entities.component';

const browser = detect();

const SearchPage = props => {
  const {
    fetchDatasetsIfNeeded,
    fetchDataServicesIfNeeded,
    fetchConceptsIfNeeded,
    fetchPublishersIfNeeded,
    fetchReferenceDataIfNeeded,
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
    publisherItems,
    referenceData,
    location,
    conceptsCompare,
    addConcept,
    removeConcept,
    searchAllEntities
  } = props;

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

  fetchDatasetsIfNeeded(datasetSearchParams);
  fetchDataServicesIfNeeded(dataServiceSearchParams);
  fetchConceptsIfNeeded(conceptSearchParams);
  fetchInformationModelsIfNeeded(informationModelSearchParams);
  fetchPublishersIfNeeded();
  fetchReferenceDataIfNeeded(REFERENCEDATA_PATH_DISTRIBUTIONTYPE);
  fetchReferenceDataIfNeeded(REFERENCEDATA_PATH_APISTATUS);
  fetchReferenceDataIfNeeded(REFERENCEDATA_PATH_LOS);
  fetchReferenceDataIfNeeded(REFERENCEDATA_PATH_THEMES);
  fetchReferenceDataIfNeeded(REFERENCEDATA_PATH_MEDIATYPES);

  const topSectionClass = cx(
    'top-section-search',
    'mb-4',
    'd-flex',
    'flex-column',
    'justify-content-between',
    {
      'top-section-search--image': !!(browser && browser.name !== 'ie')
    }
  );

  return (
    <div>
      <section className={topSectionClass}>
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
            />
          )}
        </SearchBox>
      </section>
      <div className="container">
        <Switch>
          <Route exact path={PATHNAME_SEARCH}>
            <ResultsPage
              entities={searchAllEntitiesHits}
              aggregations={allResultsEntititesAggregations}
              page={searchAllEntitiesPage}
              losItems={getLosStructure(referenceData)}
              themesItems={getThemesStructure(referenceData)}
              mediatypes={referenceData?.items?.[REFERENCEDATA_PATH_MEDIATYPES]}
              publishers={publisherItems}
            />
          </Route>
          <Route exact path={PATHNAME_DATASETS}>
            <ResultsPage
              entities={datasetItems}
              aggregations={datasetAggregations}
              page={{
                totalPages: Math.ceil((datasetTotal || 1) / HITS_PER_PAGE)
              }}
              losItems={getLosStructure(referenceData)}
              themesItems={getThemesStructure(referenceData)}
              mediatypes={referenceData?.items?.[REFERENCEDATA_PATH_MEDIATYPES]}
              publishers={publisherItems}
            />
          </Route>
          <Route exact path={PATHNAME_DATA_SERVICES}>
            <ResultsPage
              entities={dataServiceItems}
              aggregations={dataServiceAggregations}
              page={{
                totalPages: Math.ceil((dataServiceTotal || 1) / HITS_PER_PAGE)
              }}
              mediatypes={referenceData?.items?.[REFERENCEDATA_PATH_MEDIATYPES]}
              publishers={publisherItems}
            />
          </Route>
          <Route exact path={PATHNAME_CONCEPTS}>
            <ResultsPage
              entities={conceptItems}
              aggregations={conceptAggregations}
              page={{
                totalPages: Math.ceil((conceptTotal || 1) / HITS_PER_PAGE)
              }}
              publishers={publisherItems}
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
              losItems={getLosStructure(referenceData)}
              publishers={publisherItems}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default SearchPage;

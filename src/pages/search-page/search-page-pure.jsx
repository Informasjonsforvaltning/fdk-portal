import _ from 'lodash';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import cx from 'classnames';
import { detect } from 'detect-browser';

import { ResultsDataset } from './results-dataset/results-dataset.component';
import { ResultsConcepts } from './results-concepts/results-concepts.component';
import { ResultsApi } from './results-api/results-api.component';
import { ResultsInformationModel } from './results-informationmodel/results-informationmodel.component';
import {
  SearchBox,
  SearchBoxTitle
} from '../../components/search-box/search-box';

import { HitsStats } from './search-box/hits-stats/hits-stats.component';
import { getConfig } from '../../config';

import './search-page.scss';
import {
  HITS_PER_PAGE,
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_SEARCH
} from '../../constants/constants';
import { parseSearchParams } from '../../lib/location-history-helper';
import { setFilter, setMultiselectFilterValue } from './search-location-helper';
import localization from '../../lib/localization';
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
    history,
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

  const [showFilterModal, setShowFilterModal] = useState(false);

  const openFilterModal = event => {
    event.preventDefault();
    setShowFilterModal(true);
  };

  const closeFilterModal = event => {
    event.preventDefault();
    setShowFilterModal(false);
  };

  const handleFilterThemes = event => {
    const selectedValue = event.target.value;
    const add = event.target.checked;
    setMultiselectFilterValue(history, location, 'theme', selectedValue, add);
  };

  const handleDatasetFilterAccessRights = event => {
    const selectedValue = event.target.value;
    const add = event.target.checked;
    if (selectedValue === 'OPEN_DATA') {
      setMultiselectFilterValue(history, location, 'opendata', 'true', add);
    } else {
      setMultiselectFilterValue(
        history,
        location,
        'accessrights',
        selectedValue,
        add
      );
    }
  };

  const handleApiFilterAvailability = event => {
    const selectedValue = event.target.value;
    const add = event.target.checked;
    setMultiselectFilterValue(
      history,
      location,
      'availability',
      selectedValue,
      add
    );
  };

  const handleFilterPublisherHierarchy = event => {
    const selectedValue = event.target.value;

    if (event.target.checked) {
      setFilter(history, location, { orgPath: selectedValue });
    } else {
      setFilter(history, location, { orgPath: null });
    }
  };

  const handleDatasetFilterProvenance = event => {
    const selectedValue = event.target.value;
    const add = event.target.checked;
    setMultiselectFilterValue(
      history,
      location,
      'provenance',
      selectedValue,
      add
    );
  };

  const handleDatasetFilterSpatial = event => {
    const selectedValue = event.target.value;
    const add = event.target.checked;
    setMultiselectFilterValue(history, location, 'spatial', selectedValue, add);
  };

  const handleFilterFormat = event => {
    const selectedValue = event.target.value;
    const add = event.target.checked;
    setMultiselectFilterValue(history, location, 'format', selectedValue, add);
  };

  const handleFilterLos = event => {
    const selectedValue = event.target.value;
    const add = event.target.checked;
    setMultiselectFilterValue(
      history,
      location,
      'losTheme',
      selectedValue,
      add
    );
  };

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
        <div className="row mt-3 mb-3 d-lg-none">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="fdk-bg-color-neutral-lighter fdk-button w-100"
                onClick={openFilterModal}
              >
                {localization.openFilter}
              </button>
            </div>
          </div>
        </div>
        <Switch>
          <Route exact path={PATHNAME_SEARCH}>
            <ResultsPage
              entities={searchAllEntitiesHits}
              aggregations={allResultsEntititesAggregations}
              page={searchAllEntitiesPage}
              losItems={getLosStructure(referenceData)}
              themesItems={getThemesStructure(referenceData)}
              mediatypes={_.get(referenceData, [
                'items',
                REFERENCEDATA_PATH_MEDIATYPES
              ])}
              publishers={publisherItems}
              onFilterPublisher={handleFilterPublisherHierarchy}
              onFilterLos={handleFilterLos}
              onFilterAccessRights={handleDatasetFilterAccessRights}
              onFilterAvailability={handleApiFilterAvailability}
              onFilterTheme={handleFilterThemes}
            />
          </Route>
          <Route exact path={PATHNAME_DATASETS}>
            <ResultsDataset
              showFilterModal={showFilterModal}
              closeFilterModal={closeFilterModal}
              datasetItems={datasetItems}
              datasetAggregations={datasetAggregations}
              datasetTotal={datasetTotal}
              onFilterTheme={handleFilterThemes}
              onFilterAccessRights={handleDatasetFilterAccessRights}
              onFilterPublisherHierarchy={handleFilterPublisherHierarchy}
              onFilterProvenance={handleDatasetFilterProvenance}
              onFilterSpatial={handleDatasetFilterSpatial}
              onFilterLos={handleFilterLos}
              publishers={publisherItems}
              referenceData={referenceData}
              hitsPerPage={HITS_PER_PAGE}
            />
          </Route>
          <Route exact path={PATHNAME_DATA_SERVICES}>
            <ResultsApi
              showFilterModal={showFilterModal}
              closeFilterModal={closeFilterModal}
              dataServiceItems={dataServiceItems}
              dataServiceTotal={dataServiceTotal}
              dataServiceAggregations={dataServiceAggregations}
              onFilterAccessRights={handleDatasetFilterAccessRights}
              onFilterPublisherHierarchy={handleFilterPublisherHierarchy}
              onFilterFormat={handleFilterFormat}
              publisherCounts={_.get(
                dataServiceAggregations,
                'orgPath.buckets'
              )}
              publishers={publisherItems}
              hitsPerPage={HITS_PER_PAGE}
              referenceData={referenceData}
            />
          </Route>
          <Route exact path={PATHNAME_CONCEPTS}>
            <ResultsConcepts
              showFilterModal={showFilterModal}
              closeFilterModal={closeFilterModal}
              conceptItems={conceptItems}
              conceptTotal={conceptTotal}
              conceptAggregations={conceptAggregations}
              onFilterPublisherHierarchy={handleFilterPublisherHierarchy}
              publisherCounts={_.get(conceptAggregations, 'orgPath.buckets')}
              publishers={publisherItems}
              hitsPerPage={HITS_PER_PAGE}
              conceptsCompare={conceptsCompare}
              addConcept={addConcept}
              removeConcept={removeConcept}
            />
          </Route>
          <Route exact path={PATHNAME_INFORMATIONMODELS}>
            <ResultsInformationModel
              showFilterModal={showFilterModal}
              closeFilterModal={closeFilterModal}
              informationModelItems={informationModelItems}
              informationModelTotal={informationModelTotal}
              informationModelAggregations={informationModelAggregations}
              onFilterPublisherHierarchy={handleFilterPublisherHierarchy}
              onFilterLos={handleFilterLos}
              referenceData={referenceData}
              publisherCounts={_.get(
                informationModelAggregations,
                'orgPath.buckets'
              )}
              publishers={publisherItems}
              hitsPerPage={HITS_PER_PAGE}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default SearchPage;

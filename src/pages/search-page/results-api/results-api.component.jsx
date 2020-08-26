import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import localization from '../../../lib/localization';
import { FilterBox } from '../../../components/filter-box/filter-box.component';
import { FilterTree } from '../filter-tree/filter-tree.component';
import { getSortfield, setPage, setSortfield } from '../search-location-helper';
import { parseSearchParams } from '../../../lib/location-history-helper';
import { FilterPills } from '../filter-pills/filter-pills.component';
import { getConfig } from '../../../config';
import { themeFDK, themeNAP } from '../../../app/theme';
import { DataServiceItem } from '../../../components/data-service-item/data-service-item.component';
import { ErrorBoundary } from '../../../components/error-boundary/error-boundary';

import { Entity } from '../../../types/enums';
import ButtonToggleSC from '../../../components/button-toggle/styled';
import EmptyHits from '../../../components/empty-hits/empty.component';
import { getMediaTypesByKey } from '../../../redux/modules/referenceData';

const renderFilterModal = ({
  showFilterModal,
  closeFilterModal,
  dataServiceAggregations,
  locationSearch,
  publisherCounts,
  publishers,
  onFilterFormat,
  onFilterPublisherHierarchy,
  mediaTypes
}) => (
  <Modal isOpen={showFilterModal} toggle={closeFilterModal}>
    <ModalHeader toggle={closeFilterModal}>{localization.filter}</ModalHeader>
    <ModalBody>
      <div className="search-filters">
        <FilterTree
          title={localization.provider}
          aggregations={publisherCounts}
          handleFiltering={onFilterPublisherHierarchy}
          activeFilter={locationSearch.orgPath}
          referenceDataItems={publishers}
        />
        <FilterBox
          htmlKey={2}
          title={localization.facet.format}
          filter={_.get(dataServiceAggregations, 'formats')}
          onClick={onFilterFormat}
          activeFilter={locationSearch.format}
          referenceDataItems={mediaTypes}
        />
      </div>
    </ModalBody>
    <ModalFooter>
      <Button className="fdk-button" onClick={closeFilterModal} color="primary">
        {localization.close}
      </Button>
    </ModalFooter>
  </Modal>
);

const renderHits = hits => {
  if (hits && Array.isArray(hits)) {
    return hits.map(item => (
      <ErrorBoundary key={item.id}>
        <ThemeProvider
          theme={
            (getConfig().themeNap ? themeNAP : themeFDK).extendedColors[
              Entity.DATA_SERVICE
            ]
          }
        >
          <DataServiceItem dataService={item} />
        </ThemeProvider>
      </ErrorBoundary>
    ));
  }
  return null;
};

export const ResultsApiPure = ({
  showFilterModal,
  closeFilterModal,
  dataServiceItems,
  dataServiceTotal,
  dataServiceAggregations,
  onFilterPublisherHierarchy,
  onFilterFormat,
  publisherCounts,
  publishers,
  hitsPerPage,
  history,
  location,
  referenceData
}) => {
  const locationSearch = parseSearchParams(location);

  const page = parseInt(locationSearch.page || 0, 10);
  const pageCount = Math.ceil((dataServiceTotal || 1) / hitsPerPage);

  const sortfield = getSortfield(location);

  const onSortByScoreClick = () => {
    setSortfield(history, location, undefined);
  };
  const onSortByModifiedClick = () => {
    setSortfield(history, location, 'modified');
  };

  const onPageChange = data => {
    setPage(history, location, data.selected);
    window.scrollTo(0, 0);
  };

  const mediaTypes = getMediaTypesByKey(referenceData);

  return (
    <main data-test-id="apis" id="content">
      {dataServiceItems && dataServiceItems.length > 0 ? (
        <>
          <div className="row mb-3">
            <div className="col-12">
              <div className="d-flex justify-content-center justify-content-lg-end">
                <ButtonToggleSC.ButtonToggle
                  onClick={onSortByScoreClick}
                  selected={sortfield === undefined}
                  borderLeft
                >
                  {localization.formatString(
                    sortfield === undefined
                      ? localization.sort.sortedBy
                      : localization.sort.sortBy,
                    {
                      sortField: localization.sort.relevance
                    }
                  )}
                </ButtonToggleSC.ButtonToggle>
                <ButtonToggleSC.ButtonToggle
                  onClick={onSortByModifiedClick}
                  selected={sortfield === 'modified'}
                  borderRight
                >
                  {localization.formatString(
                    sortfield === 'modified'
                      ? localization.sort.sortedBy
                      : localization.sort.sortBy,
                    {
                      sortField: localization.sort.published
                    }
                  )}
                </ButtonToggleSC.ButtonToggle>
              </div>
            </div>
          </div>
          <div className="row">
            <aside className="search-filters col-lg-4 d-none d-lg-block">
              <span className="uu-invisible" aria-hidden="false">
                Filtrering
              </span>

              <FilterPills
                history={history}
                location={location}
                locationSearch={locationSearch}
                publishers={publishers}
              />

              {dataServiceAggregations && (
                <div>
                  {renderFilterModal({
                    showFilterModal,
                    closeFilterModal,
                    dataServiceAggregations,
                    locationSearch,
                    publisherCounts,
                    publishers,
                    onFilterFormat,
                    onFilterPublisherHierarchy,
                    mediaTypes
                  })}
                  <FilterTree
                    title={localization.provider}
                    aggregations={publisherCounts}
                    handleFiltering={onFilterPublisherHierarchy}
                    activeFilter={locationSearch.orgPath}
                    referenceDataItems={publishers}
                  />
                  <FilterBox
                    htmlKey={2}
                    title={localization.facet.format}
                    filter={_.get(dataServiceAggregations, 'formats')}
                    onClick={onFilterFormat}
                    activeFilter={locationSearch.format}
                    referenceDataItems={mediaTypes}
                  />
                </div>
              )}
            </aside>
            <div id="apis" className="col-12 col-lg-8">
              {renderHits(dataServiceItems)}

              <div className="col-12 d-flex justify-content-center">
                <span className="uu-invisible" aria-hidden="false">
                  Sidepaginering.
                </span>
                <ReactPaginate
                  pageCount={pageCount}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  previousLabel={localization.page.prev}
                  nextLabel={localization.page.next}
                  breakLabel={<span>...</span>}
                  breakClassName="break-me"
                  containerClassName="pagination"
                  onPageChange={onPageChange}
                  subContainerClassName="pages pagination"
                  activeClassName="active"
                  forcePage={page}
                  disableInitialCallback
                />
              </div>
            </div>
          </div>
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

ResultsApiPure.defaultProps = {
  showFilterModal: false,
  closeFilterModal: _.noop,

  dataServiceItems: [],
  dataServiceTotal: 0,
  dataServiceAggregations: null,

  onFilterPublisherHierarchy: _.noop,
  onFilterFormat: _.noop,
  publisherCounts: null,
  publishers: null,

  hitsPerPage: 10,

  history: { push: _.noop },
  location: { search: '' },
  referenceData: null
};

ResultsApiPure.propTypes = {
  showFilterModal: PropTypes.bool,
  closeFilterModal: PropTypes.func,

  dataServiceItems: PropTypes.array,
  dataServiceTotal: PropTypes.number,
  dataServiceAggregations: PropTypes.object,

  onFilterPublisherHierarchy: PropTypes.func,
  onFilterFormat: PropTypes.func,

  publisherCounts: PropTypes.array,
  publishers: PropTypes.object,

  hitsPerPage: PropTypes.number,

  history: PropTypes.object,
  location: PropTypes.object,
  referenceData: PropTypes.object
};

export const ResultsApi = withRouter(ResultsApiPure);

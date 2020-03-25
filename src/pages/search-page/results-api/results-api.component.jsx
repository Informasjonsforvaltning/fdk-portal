import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import cx from 'classnames';
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
import { ApiItem } from '../../../components/api-item/api-item.component';
import { ErrorBoundary } from '../../../components/error-boundary/error-boundary';

import { Entity } from '../../../types/enums';

const renderFilterModal = ({
  showFilterModal,
  closeFilterModal,
  apiAggregations,
  locationSearch,
  publisherCounts,
  publishers,
  onFilterFormat,
  onFilterPublisherHierarchy
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
          filter={_.get(apiAggregations, 'formats')}
          onClick={onFilterFormat}
          activeFilter={locationSearch.format}
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
            (getConfig().themeNap ? themeNAP : themeFDK).colors[
              Entity.DATA_SERVICE
            ]
          }
        >
          <ApiItem api={item} />
        </ThemeProvider>
      </ErrorBoundary>
    ));
  }
  return null;
};

export const ResultsApiPure = ({
  showFilterModal,
  closeFilterModal,
  apiItems,
  apiTotal,
  apiAggregations,
  onFilterPublisherHierarchy,
  onFilterFormat,
  publisherCounts,
  publishers,
  hitsPerPage,
  history,
  location
}) => {
  const locationSearch = parseSearchParams(location);

  const page = parseInt(locationSearch.page || 0, 10);
  const pageCount = Math.ceil((apiTotal || 1) / hitsPerPage);

  const sortfield = getSortfield(location);
  const sortByScoreClass = cx('fdk-button', 'fdk-button-black-toggle', {
    selected: !sortfield
  });
  const sortByLastModifiedClass = cx('fdk-button', 'fdk-button-black-toggle', {
    selected: sortfield === 'modified'
  });

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

  return (
    <main data-test-id="apis" id="content">
      <div className="row mb-3">
        <div className="col-6 col-lg-4" />
        <div className="col-6 col-lg-4 offset-lg-4">
          <div className="d-flex justify-content-end">
            <Button
              className={sortByScoreClass}
              onClick={onSortByScoreClick}
              color="primary"
            >
              {localization.sort.relevance}
            </Button>
            <Button
              className={sortByLastModifiedClass}
              onClick={onSortByModifiedClick}
              color="primary"
            >
              {localization.sort.modified}
            </Button>
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

          {apiAggregations && (
            <div>
              {renderFilterModal({
                showFilterModal,
                closeFilterModal,
                apiAggregations,
                locationSearch,
                publisherCounts,
                publishers,
                onFilterFormat,
                onFilterPublisherHierarchy
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
                filter={_.get(apiAggregations, 'formats')}
                onClick={onFilterFormat}
                activeFilter={locationSearch.format}
              />
            </div>
          )}
        </aside>
        <div id="apis" className="col-12 col-lg-8">
          {renderHits(apiItems)}

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
    </main>
  );
};

ResultsApiPure.defaultProps = {
  showFilterModal: false,
  closeFilterModal: _.noop,

  apiItems: [],
  apiTotal: 0,
  apiAggregations: null,

  onFilterPublisherHierarchy: _.noop,
  onFilterFormat: _.noop,
  publisherCounts: null,
  publishers: null,

  hitsPerPage: 10,

  history: { push: _.noop },
  location: { search: '' }
};

ResultsApiPure.propTypes = {
  showFilterModal: PropTypes.bool,
  closeFilterModal: PropTypes.func,

  apiItems: PropTypes.array,
  apiTotal: PropTypes.number,
  apiAggregations: PropTypes.object,

  onFilterPublisherHierarchy: PropTypes.func,
  onFilterFormat: PropTypes.func,

  publisherCounts: PropTypes.array,
  publishers: PropTypes.object,

  hitsPerPage: PropTypes.number,

  history: PropTypes.object,
  location: PropTypes.object
};

export const ResultsApi = withRouter(ResultsApiPure);

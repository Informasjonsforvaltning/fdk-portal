import _ from 'lodash';
import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ThemeProvider } from 'styled-components';

import localization from '../../../lib/localization';
import { FilterTree } from '../filter-tree/filter-tree.component';
import { getSortfield, setPage, setSortfield } from '../search-location-helper';
import { parseSearchParams } from '../../../lib/location-history-helper';
import { FilterPills } from '../filter-pills/filter-pills.component';
import { getLosStructure } from '../../../redux/modules/referenceData';
import { filterLosThemesFromAggregation } from '../los-aggregations-helper';
import { getConfig } from '../../../config';
import { themeFDK, themeNAP } from '../../../app/theme';
import { ErrorBoundary } from '../../../components/error-boundary/error-boundary';
import { InformationModelItem } from '../../../components/informationmodel-item/informationmodel-item.component';

import { Entity } from '../../../types/enums';
import ButtonToggleSC from '../../../components/button-toggle/styled';
import EmptyHits from '../../../components/empty-hits/empty.component';

const renderFilterModal = ({
  showFilterModal,
  closeFilterModal,
  informationModelAggregations,
  locationSearch,
  publisherCounts,
  publishers,
  onFilterPublisherHierarchy,
  onFilterLos,
  referenceData
}) => {
  const losItems = getLosStructure(referenceData);
  return (
    <Modal isOpen={showFilterModal} toggle={closeFilterModal}>
      <ModalHeader toggle={closeFilterModal}>{localization.filter}</ModalHeader>
      <ModalBody>
        <div className="search-filters">
          <FilterTree
            title={localization.facet.theme}
            aggregations={filterLosThemesFromAggregation(
              informationModelAggregations.los.buckets,
              losItems
            )}
            handleFiltering={onFilterLos}
            activeFilter={locationSearch.losTheme}
            referenceDataItems={losItems}
          />
          <FilterTree
            title={localization.responsible}
            aggregations={publisherCounts}
            handleFiltering={onFilterPublisherHierarchy}
            activeFilter={locationSearch.orgPath}
            referenceDataItems={publishers}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className="fdk-button"
          onClick={closeFilterModal}
          color="primary"
        >
          {localization.close}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const renderHits = (hits, losItems) => {
  if (hits && Array.isArray(hits)) {
    return hits.map(item => (
      <ErrorBoundary key={item.id}>
        <ThemeProvider
          theme={
            (getConfig().themeNap ? themeNAP : themeFDK).extendedColors[
              Entity.INFORMATION_MODEL
            ]
          }
        >
          <InformationModelItem informationModel={item} losItems={losItems} />
        </ThemeProvider>
      </ErrorBoundary>
    ));
  }
  return null;
};

export const ResultsInformationModelPure = ({
  showFilterModal,
  closeFilterModal,
  informationModelItems,
  informationModelTotal,
  informationModelAggregations,
  onFilterPublisherHierarchy,
  onFilterLos,
  publisherCounts,
  publishers,
  referenceData,
  hitsPerPage,
  history,
  location
}) => {
  const locationSearch = parseSearchParams(location);
  const page = parseInt(locationSearch.page || 0, 10);
  const pageCount = Math.ceil((informationModelTotal || 1) / hitsPerPage);

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

  const losItems = getLosStructure(referenceData);

  return (
    <main data-test-id="informationModels" id="content">
      {informationModelItems && informationModelItems.length > 0 ? (
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

              <FilterPills publishers={publishers} losItems={losItems} />

              {informationModelAggregations && (
                <div>
                  {renderFilterModal({
                    showFilterModal,
                    closeFilterModal,
                    informationModelAggregations,
                    locationSearch,
                    publisherCounts,
                    publishers,
                    onFilterPublisherHierarchy,
                    onFilterLos,
                    referenceData
                  })}
                  <FilterTree
                    title={localization.facet.theme}
                    aggregations={filterLosThemesFromAggregation(
                      _.get(informationModelAggregations, ['los', 'buckets']),
                      losItems
                    )}
                    handleFiltering={onFilterLos}
                    activeFilter={locationSearch.losTheme}
                    referenceDataItems={losItems}
                    collapseItems
                  />
                  <FilterTree
                    title={localization.responsible}
                    aggregations={publisherCounts}
                    handleFiltering={onFilterPublisherHierarchy}
                    activeFilter={locationSearch.orgPath}
                    referenceDataItems={publishers}
                  />
                </div>
              )}
            </aside>
            <div id="informationModels" className="col-12 col-lg-8">
              {!_.isEmpty(losItems) &&
                renderHits(informationModelItems, losItems)}
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

ResultsInformationModelPure.defaultProps = {
  showFilterModal: false,
  closeFilterModal: _.noop,

  informationModelItems: [],
  informationModelTotal: 0,
  informationModelAggregations: null,

  onFilterPublisherHierarchy: _.noop,
  onFilterLos: _.noop,

  publisherCounts: [],
  publishers: null,
  referenceData: null,

  hitsPerPage: 10,

  history: { push: _.noop },
  location: { search: '' }
};

ResultsInformationModelPure.propTypes = {
  showFilterModal: PropTypes.bool,
  closeFilterModal: PropTypes.func,

  informationModelItems: PropTypes.array,
  informationModelTotal: PropTypes.number,
  informationModelAggregations: PropTypes.object,

  onFilterPublisherHierarchy: PropTypes.func,
  onFilterLos: PropTypes.func,
  publisherCounts: PropTypes.array,
  publishers: PropTypes.object,
  referenceData: PropTypes.object,

  hitsPerPage: PropTypes.number,

  history: PropTypes.object,
  location: PropTypes.object
};

export const ResultsInformationModel = withRouter(ResultsInformationModelPure);

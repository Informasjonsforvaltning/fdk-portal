import React, { FC, memo, PropsWithChildren } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import SC from './styled';
import {
  DataService,
  Concept,
  Dataset,
  InformationModelDocument,
  MediaType,
  Publisher
} from '../../../types';
import localization from '../../../lib/localization';
import { FilterTree } from '../filter-tree/filter-tree.component';
import { parseSearchParams } from '../../../lib/location-history-helper';
import { FilterPills } from '../filter-pills/filter-pills.component';
import { getSortfield, setSortfield, setPage } from '../search-location-helper';
import { filterLosThemesFromAggregation } from '../los-aggregations-helper';
import SearchEntities from '../../../components/search-entities/search-entities.component';
import ButtonToggleSC from '../../../components/button-toggle/styled';
import { FilterBox } from '../../../components/filter-box/filter-box.component';
import EmptyHits from '../../../components/empty-hits/empty.component';

interface Props extends RouteComponentProps<any> {
  entities:
    | Partial<Dataset>[]
    | Partial<DataService>[]
    | Partial<Concept>[]
    | Partial<InformationModelDocument>[];
  aggregations?: any;
  page?: any;
  losItems?: any;
  themesItems?: any;
  mediatypes?: MediaType[];
  publishers: Partial<Publisher>[];
  onFilterAccessRights: any;
  onFilterAvailability: any;
  onFilterPublisher: any;
  onFilterLos: any;
  onFilterTheme: any;
  compareConceptList: Concept[];
  addConcept: (concept: Partial<Concept>) => void;
  removeConcept: (id?: string) => void;
}

const ResultsPage: FC<PropsWithChildren<Props>> = ({
  entities = [],
  aggregations = {},
  page = {},
  losItems = {},
  themesItems = [],
  mediatypes = [],
  publishers = [],
  onFilterAccessRights,
  onFilterAvailability,
  onFilterPublisher,
  onFilterLos,
  onFilterTheme,
  compareConceptList,
  addConcept,
  removeConcept,
  history,
  location
}) => {
  const searchParams = parseSearchParams(location);
  const {
    page: pageSearchParam = 0,
    orgPath: orgPathFilterParam,
    losTheme: losThemeFilterParam,
    accessrights: accessrightsParam,
    availability: availabilityParam,
    theme: themeParam
  } = searchParams;
  const { totalPages } = page;

  const sortfield = getSortfield(location);

  const onSortByScoreClick = () => {
    setSortfield(history, location, undefined);
  };
  const onSortByModifiedClick = () => {
    setSortfield(history, location, 'harvest.firstHarvested');
  };

  const onPageChange = (data: any) => {
    setPage(history, location, data.selected);
    window.scrollTo(0, 0);
  };

  return (
    <main id="content">
      {entities && entities.length > 0 ? (
        <>
          <div className="row">
            <SC.SortButtons className="col-12">
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
                selected={sortfield === 'harvest.firstHarvested'}
                borderRight
              >
                {localization.formatString(
                  sortfield === 'harvest.firstHarvested'
                    ? localization.sort.sortedBy
                    : localization.sort.sortBy,
                  {
                    sortField: localization.sort.published
                  }
                )}
              </ButtonToggleSC.ButtonToggle>
            </SC.SortButtons>
          </div>
          <SC.Content className="row">
            <section className="col-12 col-lg-8">
              <SearchEntities
                entities={entities}
                losItems={losItems}
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
              </SC.Pagination>
            </section>

            <SC.Filters className="col-lg-4">
              <span className="uu-invisible" aria-hidden="false">
                {localization.filter}
              </span>

              <FilterPills
                themesItems={themesItems}
                publishers={publishers}
                losItems={losItems}
              />

              <FilterTree
                title={localization.publisher}
                aggregations={aggregations.orgPath.buckets}
                handleFiltering={onFilterPublisher}
                activeFilter={orgPathFilterParam?.toString()}
                referenceDataItems={publishers}
              />

              <FilterTree
                title={localization.facet.theme}
                aggregations={filterLosThemesFromAggregation(
                  aggregations.los.buckets,
                  losItems
                )}
                handleFiltering={onFilterLos}
                activeFilter={losThemeFilterParam?.toString()}
                referenceDataItems={losItems}
                collapseItems
              />
              <FilterBox
                htmlKey={1}
                title={localization.facet.themeEU}
                filter={aggregations.theme}
                onClick={onFilterTheme}
                activeFilter={themeParam}
                referenceDataItems={themesItems}
              />
              <FilterBox
                htmlKey={2}
                title={localization.datasetAccessRights}
                filter={aggregations.accessRights}
                onClick={onFilterAccessRights}
                activeFilter={accessrightsParam}
                filters={searchParams}
              />
              <FilterBox
                htmlKey={3}
                title={localization.apiAvailability}
                filter={aggregations.availability}
                onClick={onFilterAvailability}
                activeFilter={availabilityParam}
                filters={searchParams}
              />
            </SC.Filters>
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

export default memo(withRouter(ResultsPage));

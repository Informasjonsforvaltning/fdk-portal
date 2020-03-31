import React, { FC, memo, PropsWithChildren } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import SC from './styled';
import {
  Api,
  Concept,
  Dataset,
  InformationModelDocument,
  Publisher
} from '../../../types';
import localization from '../../../lib/localization';
import { FilterTree } from '../filter-tree/filter-tree.component';
import { parseSearchParams } from '../../../lib/location-history-helper';
import { FilterPills } from '../filter-pills/filter-pills.component';
import { setPage } from '../search-location-helper';
import { filterLosThemesFromAggregation } from '../los-aggregations-helper';
import SearchEntities from '../../../components/search-entities/search-entities.component';

interface Props extends RouteComponentProps<any> {
  entities:
    | Partial<Dataset>[]
    | Partial<Api>[]
    | Partial<Concept>[]
    | Partial<InformationModelDocument>[];
  aggregations?: any;
  page?: any;
  losItems?: any;
  themesItems?: any;
  publishers: Partial<Publisher>[];
  onFilterPublisher: any;
  onFilterLos: any;
  compareConceptList: Concept[];
  addConcept: Function;
  removeConcept: Function;
}

const ResultsPage: FC<PropsWithChildren<Props>> = ({
  entities = [],
  aggregations = {},
  page = {},
  losItems = {},
  themesItems = [],
  publishers = [],
  onFilterPublisher,
  onFilterLos,
  compareConceptList,
  addConcept,
  removeConcept,
  history,
  location
}) => {
  const searchParams = parseSearchParams(location);
  const {
    orgPath: orgPathFilterParam,
    losTheme: losThemeFilterParam
  } = searchParams;
  const { totalPages } = page;

  const onPageChange = (data: any) => {
    setPage(history, location, data.selected);
    window.scrollTo(0, 0);
  };

  return (
    <main id="content">
      <SC.Content className="row">
        <section className="col-12 col-lg-8">
          <SearchEntities
            entities={entities}
            losItems={losItems}
            compareConceptList={compareConceptList}
            addConcept={addConcept}
            removeConcept={removeConcept}
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
              forcePage={parseInt(searchParams.page || 0, 10)}
              disableInitialCallback
            />
          </SC.Pagination>
        </section>

        <SC.Filters className="col-lg-4">
          <span className="uu-invisible" aria-hidden="false">
            {localization.filter}
          </span>

          <FilterPills
            history={history}
            location={location}
            locationSearch={searchParams}
            themesItems={themesItems}
            publishers={publishers}
            losItems={losItems}
          />

          <FilterTree
            title={localization.publisher}
            aggregations={aggregations.orgPath.buckets}
            handleFiltering={onFilterPublisher}
            activeFilter={orgPathFilterParam}
            referenceDataItems={publishers}
          />

          <FilterTree
            title={localization.facet.theme}
            aggregations={filterLosThemesFromAggregation(
              aggregations.los.buckets,
              losItems
            )}
            handleFiltering={onFilterLos}
            activeFilter={losThemeFilterParam}
            referenceDataItems={losItems}
            collapseItems
          />
        </SC.Filters>
      </SC.Content>
    </main>
  );
};

export default memo(withRouter(ResultsPage));

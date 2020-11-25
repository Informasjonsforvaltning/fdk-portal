import React, { ChangeEvent, FC, memo, useState } from 'react';
import keyBy from 'lodash/keyBy';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES,
  PATHNAME_SEARCH
} from '../../../constants/constants';
import SC from './styled';
import localization from '../../../lib/localization';
import { FilterPills } from '../filter-pills/filter-pills.component';
import { FilterTree } from '../filter-tree/filter-tree.component';
import { parseSearchParams } from '../../../lib/location-history-helper';
import {
  setFilter,
  setMultiselectFilterValue
} from '../search-location-helper';
import { filterLosThemesFromAggregation } from '../los-aggregations-helper';
import { FilterBox } from '../../../components/filter-box/filter-box.component';
import { getConfig } from '../../../config';

interface Props extends RouteComponentProps {
  themesItems?: any;
  publishers?: any;
  losItems?: any;
  mediaTypes: any;
  aggregations: any;
}

const FiltersPure: FC<Props> = ({
  themesItems = [],
  publishers = [],
  losItems = [],
  mediaTypes = [],
  aggregations = {},
  history,
  location: { pathname } = {}
}) => {
  const [filterOpen, setFilterOpen] = useState(false);

  const searchParams = parseSearchParams(location);
  const {
    accessrights: accessrightsParam,
    orgPath: orgPathFilterParam,
    losTheme: losThemeFilterParam,
    theme: themeParam,
    spatial: spatialParam,
    provenance: provenanceParam,
    format: formatParam
  } = searchParams;

  const handleFilterThemes = ({
    target: { value, checked }
  }: ChangeEvent<HTMLInputElement>) => {
    setMultiselectFilterValue(history, location, 'theme', value, checked);
  };

  const handleDatasetFilterAccessRights = ({
    target: { value, checked }
  }: ChangeEvent<HTMLInputElement>) => {
    if (value === 'OPEN_DATA') {
      setMultiselectFilterValue(history, location, 'opendata', 'true', checked);
    } else {
      setMultiselectFilterValue(
        history,
        location,
        'accessrights',
        value,
        checked
      );
    }
  };

  const handleFilterPublisherHierarchy = ({
    target: { value, checked }
  }: ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      setFilter(history, location, { orgPath: value });
    } else {
      setFilter(history, location, { orgPath: null });
    }
  };

  const handleDatasetFilterProvenance = ({
    target: { value, checked }
  }: ChangeEvent<HTMLInputElement>) => {
    setMultiselectFilterValue(history, location, 'provenance', value, checked);
  };

  const handleDatasetFilterSpatial = ({
    target: { value, checked }
  }: ChangeEvent<HTMLInputElement>) => {
    setMultiselectFilterValue(history, location, 'spatial', value, checked);
  };

  const handleFilterFormat = ({
    target: { value, checked }
  }: ChangeEvent<HTMLInputElement>) => {
    setMultiselectFilterValue(history, location, 'format', value, checked);
  };

  const handleFilterLos = ({
    target: { value, checked }
  }: ChangeEvent<HTMLInputElement>) => {
    setMultiselectFilterValue(history, location, 'losTheme', value, checked);
  };

  const getFilters = () => {
    switch (pathname) {
      case PATHNAME_SEARCH:
        return (
          <>
            <FilterTree
              title={localization.publisher}
              aggregations={aggregations.orgPath.buckets}
              handleFiltering={handleFilterPublisherHierarchy}
              activeFilter={orgPathFilterParam?.toString()}
              referenceDataItems={publishers}
            />
            <FilterTree
              title={localization.facet.theme}
              aggregations={filterLosThemesFromAggregation(
                aggregations.los.buckets,
                losItems
              )}
              handleFiltering={handleFilterLos}
              activeFilter={losThemeFilterParam?.toString()}
              referenceDataItems={losItems}
              collapseItems
            />
            <FilterBox
              htmlKey={1}
              title={localization.facet.themeEU}
              filter={aggregations.theme}
              onClick={handleFilterThemes}
              activeFilter={themeParam}
              referenceDataItems={themesItems}
            />
            <FilterBox
              htmlKey={2}
              title={localization.datasetAccessRights}
              filter={aggregations.accessRights}
              onClick={handleDatasetFilterAccessRights}
              activeFilter={accessrightsParam}
              filters={searchParams}
            />
          </>
        );
      case PATHNAME_DATASETS:
        return (
          <>
            <FilterTree
              title={localization.facet.theme}
              aggregations={filterLosThemesFromAggregation(
                aggregations.los?.buckets,
                losItems
              )}
              handleFiltering={handleFilterLos}
              activeFilter={losThemeFilterParam?.toString()}
              referenceDataItems={losItems}
              collapseItems
            />
            {!getConfig().themeNap && (
              <FilterBox
                htmlKey={1}
                title={localization.facet.themeEU}
                filter={aggregations.theme}
                onClick={handleFilterThemes}
                activeFilter={themeParam}
                referenceDataItems={themesItems}
              />
            )}
            {!getConfig().themeNap && (
              <FilterBox
                htmlKey={2}
                title={localization.facet.accessRight}
                filter={aggregations.accessRights}
                onClick={handleDatasetFilterAccessRights}
                activeFilter={accessrightsParam}
                filters={searchParams}
              />
            )}
            <FilterTree
              title={localization.facet.organisation}
              aggregations={aggregations.orgPath.buckets}
              handleFiltering={handleFilterPublisherHierarchy}
              activeFilter={orgPathFilterParam?.toString()}
              referenceDataItems={publishers}
            />
            <FilterBox
              htmlKey={3}
              title={localization.facet.spatial}
              filter={aggregations.spatial}
              onClick={handleDatasetFilterSpatial}
              activeFilter={spatialParam}
            />
            <FilterBox
              htmlKey={4}
              title={localization.facet.provenance}
              filter={aggregations.provenance}
              onClick={handleDatasetFilterProvenance}
              activeFilter={provenanceParam}
            />
          </>
        );
      case PATHNAME_DATA_SERVICES:
        return (
          <>
            <FilterTree
              title={localization.provider}
              aggregations={aggregations.orgPath.buckets}
              handleFiltering={handleFilterPublisherHierarchy}
              activeFilter={orgPathFilterParam?.toString()}
              referenceDataItems={publishers}
            />
            <FilterBox
              htmlKey={2}
              title={localization.facet.format}
              filter={aggregations.formats}
              onClick={handleFilterFormat}
              activeFilter={formatParam}
              referenceDataItems={keyBy(mediaTypes, 'code')}
            />
          </>
        );
      case PATHNAME_CONCEPTS:
        return (
          <FilterTree
            title={localization.responsible}
            aggregations={aggregations.orgPath.buckets}
            handleFiltering={handleFilterPublisherHierarchy}
            activeFilter={orgPathFilterParam?.toString()}
            referenceDataItems={publishers}
          />
        );
      case PATHNAME_INFORMATIONMODELS:
        return (
          <>
            <FilterTree
              title={localization.facet.theme}
              aggregations={filterLosThemesFromAggregation(
                aggregations.los?.buckets,
                losItems
              )}
              handleFiltering={handleFilterLos}
              activeFilter={losThemeFilterParam?.toString()}
              referenceDataItems={losItems}
              collapseItems
            />
            <FilterTree
              title={localization.responsible}
              aggregations={aggregations.orgPath.buckets}
              handleFiltering={handleFilterPublisherHierarchy}
              activeFilter={orgPathFilterParam?.toString()}
              referenceDataItems={publishers}
            />
          </>
        );
      case PATHNAME_PUBLIC_SERVICES:
        return (
          <>
            <FilterTree
              title={localization.provider}
              aggregations={aggregations.hasCompetentAuthority.buckets}
              handleFiltering={handleFilterPublisherHierarchy}
              activeFilter={orgPathFilterParam?.toString()}
              referenceDataItems={publishers}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SC.FilterToggle onClick={() => setFilterOpen(!filterOpen)}>
        {localization.openFilter}
      </SC.FilterToggle>
      {filterOpen && <SC.FiltersSmall>{getFilters()}</SC.FiltersSmall>}
      <FilterPills
        themesItems={themesItems}
        publishers={publishers}
        losItems={losItems}
      />
      <SC.Filters>{getFilters()}</SC.Filters>
    </>
  );
};

export default memo(withRouter(FiltersPure));

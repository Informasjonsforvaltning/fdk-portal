import React, { FC, memo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_DATASETS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES_AND_EVENTS,
  PATHNAME_SEARCH
} from '../../../constants/constants';
import SC from './styled';
import localization from '../../../lib/localization';
import { FilterTree } from '../filter-tree/filter-tree.component';
import { parseSearchParams } from '../../../lib/location-history-helper';
import {
  setFilter,
  setMultiselectFilterValue
} from '../search-location-helper';
import { filterLosThemesFromAggregation } from '../los-aggregations-helper';
import {
  FilterBox,
  FilterChange
} from '../../../components/filter-box/filter-box.component';
import { getConfig } from '../../../config';
import { keyPrefixForest } from '../../../lib/key-prefix-forest';

interface Props extends RouteComponentProps {
  themesItems?: any;
  publishers?: any;
  losItems?: any;
  aggregations: any;
}

const FiltersPure: FC<Props> = ({
  themesItems = [],
  publishers = [],
  losItems = [],
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

  const handleFilterThemes = ({ value, checked }: FilterChange) => {
    setMultiselectFilterValue(history, location, 'theme', value, checked);
  };

  const accessRights = aggregations?.accessRights || [];
  const openData = (aggregations?.openData || []).filter(
    (item: { key: string }) => item.key === 'true'
  );

  const openDataTransformed = openData.map((item: { count: number }) => ({
    key: 'OPEN_DATA',
    count: item.count,
    label: 'OPEN_DATA'
  }));

  const handleDatasetFilterAccessRights = ({
    value,
    checked
  }: FilterChange) => {
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

  const handleFilterPublisherHierarchy = ({ value, checked }: FilterChange) => {
    if (checked) {
      setFilter(history, location, { orgPath: value });
    } else {
      setFilter(history, location, { orgPath: null });
    }
  };

  const handleDatasetFilterProvenance = ({ value, checked }: FilterChange) => {
    setMultiselectFilterValue(history, location, 'provenance', value, checked);
  };

  const handleDatasetFilterSpatial = ({ value, checked }: FilterChange) => {
    setMultiselectFilterValue(history, location, 'spatial', value, checked);
  };

  const handleFilterFormat = ({ value, checked }: FilterChange) => {
    setMultiselectFilterValue(history, location, 'format', value, checked);
  };

  const handleFilterLos = ({ value, checked }: FilterChange) => {
    setMultiselectFilterValue(history, location, 'losTheme', value, checked);
  };

  const getFilters = () => {
    switch (pathname) {
      case PATHNAME_SEARCH:
        return (
          <>
            <FilterTree
              title={localization.publisher}
              aggregationsForest={keyPrefixForest(aggregations?.orgPath)}
              handleFiltering={handleFilterPublisherHierarchy}
              activeFilter={orgPathFilterParam?.toString()}
              referenceDataItems={publishers}
              searchable
            />
            <FilterTree
              title={localization.facet.theme}
              aggregationsForest={keyPrefixForest(
                filterLosThemesFromAggregation(aggregations?.losTheme, losItems)
              )}
              handleFiltering={handleFilterLos}
              activeFilter={losThemeFilterParam?.toString()}
              referenceDataItems={losItems}
              collapseItems
            />
            <FilterBox
              htmlKey={1}
              title={localization.facet.themeEU}
              filter={aggregations?.dataTheme}
              onClick={handleFilterThemes}
              activeFilter={themeParam}
              referenceDataItems={themesItems}
            />
          </>
        );
      case PATHNAME_DATASETS:
        return (
          <>
            <FilterTree
              title={localization.facet.theme}
              aggregationsForest={keyPrefixForest(
                filterLosThemesFromAggregation(aggregations?.losTheme, losItems)
              )}
              handleFiltering={handleFilterLos}
              activeFilter={losThemeFilterParam?.toString()}
              referenceDataItems={losItems}
              collapseItems
            />
            {!getConfig().isNapProfile && (
              <FilterBox
                htmlKey={1}
                title={localization.facet.themeEU}
                filter={aggregations?.dataTheme}
                onClick={handleFilterThemes}
                activeFilter={themeParam}
                referenceDataItems={themesItems}
              />
            )}
            {!getConfig().isNapProfile && (
              <FilterBox
                htmlKey={2}
                title={localization.facet.accessRight}
                filter={[...openDataTransformed, ...accessRights]}
                onClick={handleDatasetFilterAccessRights}
                activeFilter={accessrightsParam}
                filters={searchParams}
              />
            )}
            <FilterTree
              title={localization.facet.organisation}
              aggregationsForest={keyPrefixForest(aggregations?.orgPath)}
              handleFiltering={handleFilterPublisherHierarchy}
              activeFilter={orgPathFilterParam?.toString()}
              referenceDataItems={publishers}
              searchable
            />
            <FilterBox
              htmlKey={3}
              title={localization.facet.format}
              filter={aggregations?.format}
              searchable
              groupByPrefix={['FILE_TYPE', 'MEDIA_TYPE', 'UNKNOWN']}
              onClick={handleFilterFormat}
              activeFilter={formatParam}
              capitalizeOption={false}
            />
            <FilterBox
              htmlKey={4}
              title={localization.facet.spatial}
              filter={aggregations?.spatial}
              onClick={handleDatasetFilterSpatial}
              activeFilter={spatialParam}
            />
            <FilterBox
              htmlKey={5}
              title={localization.facet.provenance}
              filter={aggregations?.provenance}
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
              aggregationsForest={keyPrefixForest(aggregations?.orgPath)}
              handleFiltering={handleFilterPublisherHierarchy}
              activeFilter={orgPathFilterParam?.toString()}
              referenceDataItems={publishers}
              searchable
            />
            <FilterBox
              htmlKey={2}
              title={localization.facet.format}
              capitalizeOption={false}
              filter={aggregations?.format}
              searchable
              groupByPrefix={['FILE_TYPE', 'MEDIA_TYPE', 'UNKNOWN']}
              onClick={handleFilterFormat}
              activeFilter={formatParam}
            />
          </>
        );
      case PATHNAME_CONCEPTS:
        return (
          <FilterTree
            title={localization.responsible}
            aggregationsForest={keyPrefixForest(aggregations?.orgPath)}
            handleFiltering={handleFilterPublisherHierarchy}
            activeFilter={orgPathFilterParam?.toString()}
            referenceDataItems={publishers}
            searchable
          />
        );
      case PATHNAME_INFORMATIONMODELS:
        return (
          <>
            <FilterTree
              title={localization.facet.theme}
              aggregationsForest={keyPrefixForest(
                filterLosThemesFromAggregation(aggregations?.losTheme, losItems)
              )}
              handleFiltering={handleFilterLos}
              activeFilter={losThemeFilterParam?.toString()}
              referenceDataItems={losItems}
              collapseItems
            />
            <FilterTree
              title={localization.responsible}
              aggregationsForest={keyPrefixForest(aggregations?.orgPath)}
              handleFiltering={handleFilterPublisherHierarchy}
              activeFilter={orgPathFilterParam?.toString()}
              referenceDataItems={publishers}
              searchable
            />
          </>
        );
      case PATHNAME_PUBLIC_SERVICES_AND_EVENTS:
        return (
          <FilterTree
            title={localization.provider}
            aggregationsForest={keyPrefixForest(aggregations?.orgPath)}
            handleFiltering={handleFilterPublisherHierarchy}
            activeFilter={orgPathFilterParam?.toString()}
            referenceDataItems={publishers}
            searchable
          />
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
      <SC.Filters>{getFilters()}</SC.Filters>
    </>
  );
};

export default memo(withRouter(FiltersPure));

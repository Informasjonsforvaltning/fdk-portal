import React, { FC, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import capitalize from 'lodash/capitalize';
import get from 'lodash/get';

import { parseSearchParams } from '../../../lib/location-history-helper';
import { omit } from '../../../lib/omit';
import localization from '../../../lib/localization';
import { getTranslateText } from '../../../lib/translateText';
import { Pill } from '../../../components/pill/pill.component';
import {
  clearFilters,
  isFilterNotEmpty,
  setMultiselectFilterValue
} from '../search-location-helper';

import SC from './styled';
import type { EuTheme, LosTheme, EventType } from '../../../types';
import { Filter } from '../../../types/enums';

interface ThemesItems {
  [key: string]: Partial<EuTheme>;
}

interface LosThemeItems {
  [key: string]: Partial<LosTheme>;
}

interface Props extends RouteComponentProps {
  themesItems: ThemesItems;
  losItems: LosThemeItems;
  publishers: any;
  eventTypes?: Record<string, EventType>;
}

interface ReferenceDataItems {
  [key: string]: any;
}

const getFilterLabel = (
  filterName: string,
  filterValue: string,
  referenceDataItems: any
) => {
  if (
    filterValue.toUpperCase() === 'UKJENT' ||
    filterValue.toUpperCase() === 'MISSING'
  ) {
    return localization.unknown;
  }

  switch (filterName) {
    case Filter.ORGPATH: {
      const referencedItem = referenceDataItems[filterValue];
      if (!(referencedItem?.name || referencedItem?.prefLabel)) {
        return capitalize(filterValue.replace(/^\/|\/$/g, ''));
      }
      return (
        localization.facet.publishers[name] ||
        getTranslateText(referencedItem?.prefLabel) ||
        capitalize(referencedItem?.name)
      );
    }
    case Filter.THEME:
      return (
        getTranslateText(get(referenceDataItems, [filterValue, 'title'])) ||
        filterValue
      );
    case Filter.LOS:
    case Filter.EVENT_TYPE:
      return (
        getTranslateText(get(referenceDataItems, [filterValue, 'prefLabel'])) ||
        filterValue
      );
    case Filter.OPENDATA:
      return localization.open_data;
    case Filter.LASTXDAYS:
      return localization.formatString(localization.addedLastDays, {
        days: filterValue
      });
    default:
      return localization[filterValue.toLowerCase()] || capitalize(filterValue);
  }
};

const renderFilterValuesPills = (
  filterName: string,
  filterValues: any,
  history: any,
  location: any,
  referenceDataItems: any
) =>
  filterValues.map((filterValue: string, index: number) => (
    <Pill
      key={`${filterValue}-${index}`}
      label={getFilterLabel(filterName, filterValue, referenceDataItems)}
      onClick={() =>
        setMultiselectFilterValue(
          history,
          location,
          filterName,
          filterValue,
          false
        )
      }
    />
  ));

const FilterPillsPure: FC<Props> = ({
  history,
  location,
  themesItems,
  publishers,
  losItems,
  eventTypes = {}
}) => {
  if (!isFilterNotEmpty(location)) {
    return null;
  }

  const locationSearch: any = parseSearchParams(location);

  const referenceDataItems: ReferenceDataItems = {
    [Filter.THEME]: themesItems,
    [Filter.LOS]: losItems,
    [Filter.ORGPATH]: publishers,
    [Filter.EVENT_TYPE]: eventTypes
  };

  return (
    <div>
      <SC.Heading>{localization.activeFilter}</SC.Heading>
      <SC.Pills>
        {Object.keys(
          omit(locationSearch, [Filter.Q, Filter.PAGE, Filter.SORTFIELD])
        ).map((filterName: string) =>
          renderFilterValuesPills(
            filterName,
            locationSearch[filterName]?.split(','),
            history,
            location,
            referenceDataItems[filterName]
          )
        )}
      </SC.Pills>
      <SC.ClearButton
        onClick={() => clearFilters(history, location)}
        type="button"
      >
        {localization.query.clear}
      </SC.ClearButton>
    </div>
  );
};

export const FilterPills = withRouter(memo(FilterPillsPure));

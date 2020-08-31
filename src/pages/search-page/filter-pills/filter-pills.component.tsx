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
  setMultiselectFilterValue,
  isFilterNotEmpty,
  clearFilters
} from '../search-location-helper';

import SC from './styled';
import { EuTheme, LosTheme, Publisher } from '../../../types';

interface ThemesItems {
  [key: string]: Partial<EuTheme>;
}

interface LosThemeItems {
  [key: string]: Partial<LosTheme>;
}

interface PublisherItems {
  [key: string]: Partial<Publisher>;
}

interface Props extends RouteComponentProps {
  themesItems: ThemesItems;
  losItems: LosThemeItems;
  publishers: any;
}

interface ReferenceDataItems {
  [key: string]: any;
}

const getFilterLabel = (
  filterName: string,
  filterValue: string,
  referenceDataItems: ThemesItems | LosThemeItems | PublisherItems
) => {
  if (
    filterValue.toUpperCase() === 'UKJENT' ||
    filterValue.toUpperCase() === 'MISSING'
  ) {
    return localization.unknown;
  }

  switch (filterName) {
    case 'orgPath': {
      const { name, prefLabel }: any = referenceDataItems[filterValue];
      if (!(name || prefLabel)) {
        return capitalize(filterValue.replace(/^\/|\/$/g, ''));
      }
      return (
        localization.facet.publishers[name] ||
        getTranslateText(prefLabel) ||
        capitalize(name)
      );
    }
    case 'theme':
      return (
        getTranslateText(get(referenceDataItems, [filterValue, 'title'])) ||
        filterValue
      );
    case 'losTheme':
      return (
        getTranslateText(get(referenceDataItems, [filterValue, 'prefLabel'])) ||
        filterValue
      );
    case 'opendata':
      return localization.open_data;
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
  losItems
}) => {
  if (!isFilterNotEmpty(location)) {
    return null;
  }

  const locationSearch: any = parseSearchParams(location);

  const referenceDataItems: ReferenceDataItems = {
    theme: themesItems,
    losTheme: losItems,
    orgPath: publishers
  };

  return (
    <div>
      <SC.Heading>{localization.activeFilter}</SC.Heading>
      <SC.Pills>
        {Object.keys(
          omit(locationSearch, ['q', 'page', 'sortfield'])
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

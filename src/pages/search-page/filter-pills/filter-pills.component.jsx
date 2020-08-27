import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import get from 'lodash/get';

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

const getFilterLabel = (filterName, filterValue, referenceDataItems) => {
  if (
    filterValue.toUpperCase() === 'UKJENT' ||
    filterValue.toUpperCase() === 'MISSING'
  ) {
    return localization.unknown;
  }

  switch (filterName) {
    case 'orgPath': {
      const currentPublisher = referenceDataItems[filterValue];
      if (!currentPublisher) {
        return capitalize(filterValue.replace(/^\/|\/$/g, ''));
      }
      return (
        localization.facet.publishers[currentPublisher.name] ||
        getTranslateText(currentPublisher.prefLabel) ||
        capitalize(currentPublisher.name)
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
  filterName,
  filterValues,
  history,
  location,
  referenceDataItems
) =>
  filterValues.map((filterValue, index) => (
    <Pill
      key={`${filterValue}-${index}`}
      label={getFilterLabel(filterName, filterValue, referenceDataItems)}
      handleOnClick={() =>
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

export const FilterPills = ({
  history,
  location,
  locationSearch,
  themesItems,
  publishers,
  losItems
}) => {
  if (!isFilterNotEmpty(location)) {
    return null;
  }

  const referenceDataItems = {
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
        ).map(filterName =>
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

FilterPills.defaultProps = {
  history: null,
  location: null,
  locationSearch: null,
  themesItems: null,
  publishers: null,
  losItems: null
};

FilterPills.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  locationSearch: PropTypes.object,
  themesItems: PropTypes.object,
  publishers: PropTypes.object,
  losItems: PropTypes.object
};

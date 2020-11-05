import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { resolve } from 'react-resolver';
import {
  searchDataServices,
  paramsToSearchBody,
  extractFirstDataService
} from '../../../api/search-fulltext-api/dataservices';
import { getTranslateText } from '../../../lib/translateText';

const memoizedSearchDataServices = _.memoize(searchDataServices);

export const PureDataServiceBreadcrumb = ({ dataServiceItem }: any) => (
  <span>{getTranslateText(dataServiceItem?.title)}</span>
);

const mapProps = {
  dataServiceItem: async ({
    match: { params: { id = undefined } = {} } = {}
  }) =>
    id
      ? memoizedSearchDataServices(paramsToSearchBody({ id }))
          .then(extractFirstDataService)
          .catch(() => null)
      : null
};

PureDataServiceBreadcrumb.defaultProps = {
  dataServiceItem: null
};

PureDataServiceBreadcrumb.propTypes = {
  dataServiceItem: PropTypes.object
};

export const DataServiceBreadcrumb = resolve(mapProps)(
  PureDataServiceBreadcrumb
);

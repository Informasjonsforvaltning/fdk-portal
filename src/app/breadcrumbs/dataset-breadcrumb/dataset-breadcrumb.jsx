import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { resolve } from 'react-resolver';
import {
  searchDatasets,
  paramsToSearchBody,
  extractFirstDataset
} from '../../../api/search-fulltext-api/datasets';
import { getTranslateText } from '../../../lib/translateText';

const memoizedGetDatasets = _.memoize(searchDatasets);

export const PureDatasetBreadcrumb = ({ datasetItem = {} }) => (
  <span>{getTranslateText(datasetItem?.title)}</span>
);

const mapProps = {
  datasetItem: ({ match: { params: { id } = {} } = {} }) =>
    id &&
    memoizedGetDatasets(paramsToSearchBody({ id }))
      .then(extractFirstDataset)
      .catch(() => null)
};

PureDatasetBreadcrumb.defaultProps = {
  datasetItem: null
};

PureDatasetBreadcrumb.propTypes = {
  datasetItem: PropTypes.object
};

export const DatasetBreadcrumb = resolve(mapProps)(PureDatasetBreadcrumb);

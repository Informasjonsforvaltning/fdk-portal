import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';
import { getDatasetsReport } from '../../api/report-api/reports';
import {
  getDatasetsTimeseries,
  extractLabelsAndData
} from '../../api/report-api/timeseries';
import { parseSearchParams } from '../../lib/location-history-helper';

import { getDataServiceStats } from '../../api/get-data-service-stats';
import { getConceptStats } from '../../api/get-concept-stats';
import { getParamFromLocation } from '../../lib/addOrReplaceUrlParam';
import { searchInformationModels } from '../../api/search-fulltext-api/informationmodels';

const memoizedGetDatasetsReport = memoize(getDatasetsReport);
const memoizedGetDatasetsTimeseries = memoize(getDatasetsTimeseries);
const memoizedGetDataServiceStats = memoize(getDataServiceStats);
const memoizedGetConceptStats = memoize(getConceptStats);
const memoizedSearchInformationModels = memoize(searchInformationModels);

const mapProps = {
  datasetsReport: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetDatasetsReport({ orgPath, los });
  },
  datasetsTimeseries: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetDatasetsTimeseries({ orgPath, los }).then(
      extractLabelsAndData
    );
  },
  dataServiceStats: ({ location }) =>
    memoizedGetDataServiceStats(getParamFromLocation(location, 'orgPath')),
  conceptStats: ({ location }) =>
    memoizedGetConceptStats(getParamFromLocation(location, 'orgPath')),
  informationModelsReport: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedSearchInformationModels({ orgPath, los });
  }
};

export const reportPageResolver = resolve(mapProps);

import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';
import { getDatasetsReport } from '../../api/report-api/reports';
import { getDatasetsTimeseries } from '../../api/report-api/timeseries';
import { parseSearchParams } from '../../lib/location-history-helper';

import { getDataServiceStats } from '../../api/get-data-service-stats';
import {
  extractConceptsTotal,
  paramsToSearchBody,
  searchConcepts
} from '../../api/search-fulltext-api/concepts';
import { getParamFromLocation } from '../../lib/addOrReplaceUrlParam';
import { searchInformationModels } from '../../api/search-fulltext-api/informationmodels';

const memoizedGetDatasetsReport = memoize(getDatasetsReport);
const memoizedGetDatasetsTimeseries = memoize(getDatasetsTimeseries);
const memoizedGetDataServiceStats = memoize(getDataServiceStats);
const memoizedGetSearchConcepts = memoize(searchConcepts);
const memoizedSearchInformationModels = memoize(searchInformationModels);

const mapProps = {
  datasetsReport: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetDatasetsReport({ orgPath, los });
  },
  datasetsTimeSeries: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetDatasetsTimeseries({ orgPath, los });
  },
  dataServiceStats: ({ location }) =>
    memoizedGetDataServiceStats(getParamFromLocation(location, 'orgPath')),
  conceptStats: ({ location }) => {
    const { orgPath } = parseSearchParams(location);
    return memoizedGetSearchConcepts(paramsToSearchBody({ orgPath })).then(
      extractConceptsTotal
    );
  },
  informationModelsReport: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedSearchInformationModels({ orgPath, los });
  }
};

export const reportPageResolver = resolve(mapProps);

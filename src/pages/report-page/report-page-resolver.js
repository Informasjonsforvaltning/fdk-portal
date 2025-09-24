import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';
import {
  getDatasetsReport,
  getConceptsReport,
  getInformationModelsReport,
  getDataServicesReport
} from '../../api/report-api/reports';
import {
  conceptTimeSeriesRequest,
  dataServiceTimeSeriesRequest,
  datasetTimeSeriesRequest,
  infoModelTimeSeriesRequest
} from '../../api/statistics-api/time-series';
import { parseSearchParams } from '../../lib/location-history-helper';

import { extractConcepts, searchConcepts } from '../../api/search-api/concepts';
import { paramsToSearchBody } from '../../utils/common/index';
import { sortKeyWithCount } from './sort-helper';

const memoizedGetDatasetsReport = memoize(getDatasetsReport);
const memoizedGetDatasetsTimeSeries = memoize(datasetTimeSeriesRequest);
const memoizedGetDataServicesReport = memoize(getDataServicesReport);
const memoizedGetDataServicesTimeSeries = memoize(dataServiceTimeSeriesRequest);
const memoizedGetConceptsReport = memoize(getConceptsReport);
const memoizedGetConceptsTimeSeries = memoize(conceptTimeSeriesRequest);
const memoizedGetInformationModelsReport = memoize(getInformationModelsReport);
const memoizedGetInformationModelsTimeSeries = memoize(
  infoModelTimeSeriesRequest
);
const memoizedSearchConcepts = memoize(searchConcepts);

const mapProps = {
  datasetsReport: async ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    const result = await memoizedGetDatasetsReport({ orgPath, los });
    return result || {};
  },
  datasetsTimeSeries: async () => {
    const result = await memoizedGetDatasetsTimeSeries();
    return result || {};
  },
  dataServicesReport: async ({ location }) => {
    const { orgPath } = parseSearchParams(location);
    const result = await memoizedGetDataServicesReport({ orgPath });
    return result || {};
  },
  dataServicesTimeSeries: async () => {
    const result = await memoizedGetDataServicesTimeSeries();
    return result || {};
  },
  conceptsReport: async ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);

    const reportItems = await memoizedGetConceptsReport({ orgPath, los });

    // Add null check for reportItems
    if (!reportItems) {
      return { mostInUse: [], allReferencedConcepts: [] };
    }

    const { mostInUse = [] } = reportItems;
    const topReferencedConceptIdentifiers = sortKeyWithCount(mostInUse)
      .slice(0, 10)
      .map(({ key }) => key);
    const allReferencedConcepts = await memoizedSearchConcepts(
      paramsToSearchBody({ uri: topReferencedConceptIdentifiers })
    ).then(result => extractConcepts(result));

    return { ...reportItems, allReferencedConcepts };
  },
  conceptsTimeSeries: async () => {
    const result = await memoizedGetConceptsTimeSeries();
    return result || {};
  },
  informationModelsReport: async ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    const result = await memoizedGetInformationModelsReport({ orgPath, los });
    return result || {};
  },
  informationModelsTimeSeries: async () => {
    const result = await memoizedGetInformationModelsTimeSeries();
    return result || {};
  }
};

export const reportPageResolver = resolve(mapProps);

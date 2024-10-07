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
  datasetsReport: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetDatasetsReport({ orgPath, los });
  },
  datasetsTimeSeries: ({ location }) => {
    const { orgPath } = parseSearchParams(location);
    return memoizedGetDatasetsTimeSeries(orgPath);
  },
  dataServicesReport: ({ location }) => {
    const { orgPath } = parseSearchParams(location);
    return memoizedGetDataServicesReport({ orgPath });
  },
  dataServicesTimeSeries: ({ location }) => {
    const { orgPath } = parseSearchParams(location);
    return memoizedGetDataServicesTimeSeries(orgPath);
  },
  conceptsReport: async ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);

    const reportItems = await memoizedGetConceptsReport({ orgPath, los });

    const { mostInUse = [] } = reportItems;
    const allReferencedConceptIdentifiers = mostInUse.map(({ key }) => key);
    const allReferencedConcepts = await memoizedSearchConcepts(
      paramsToSearchBody({ uri: allReferencedConceptIdentifiers })
    ).then(result => extractConcepts(result));

    return { ...reportItems, allReferencedConcepts };
  },
  conceptsTimeSeries: ({ location }) => {
    const { orgPath } = parseSearchParams(location);
    return memoizedGetConceptsTimeSeries(orgPath);
  },
  informationModelsReport: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetInformationModelsReport({ orgPath, los });
  },
  informationModelsTimeSeries: ({ location }) => {
    const { orgPath } = parseSearchParams(location);
    return memoizedGetInformationModelsTimeSeries(orgPath);
  }
};

export const reportPageResolver = resolve(mapProps);

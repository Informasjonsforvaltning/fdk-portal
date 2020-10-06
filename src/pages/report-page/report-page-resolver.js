import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';
import {
  getDatasetsReport,
  getConceptsReport,
  getInformationModelsReport,
  getDataServicesReport
} from '../../api/report-api/reports';
import {
  getDatasetsTimeseries,
  getConceptsTimeseries,
  getInformationModelsTimeseries,
  getDataServicesTimeseries
} from '../../api/report-api/timeseries';
import { parseSearchParams } from '../../lib/location-history-helper';

import {
  extractConcepts,
  searchConcepts,
  paramsToSearchBody
} from '../../api/search-fulltext-api/concepts';

const memoizedGetDatasetsReport = memoize(getDatasetsReport);
const memoizedGetDatasetsTimeseries = memoize(getDatasetsTimeseries);
const memoizedGetDataServicesReport = memoize(getDataServicesReport);
const memoizedGetDataServicesTimeseries = memoize(getDataServicesTimeseries);
const memoizedGetConceptsReport = memoize(getConceptsReport);
const memoizedGetConceptsTimeseries = memoize(getConceptsTimeseries);
const memoizedGetInformationModelsReport = memoize(getInformationModelsReport);
const memoizedGetInformationModelsTimeseries = memoize(
  getInformationModelsTimeseries
);
const memoizedSearchConcepts = memoize(searchConcepts);

const mapProps = {
  datasetsReport: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetDatasetsReport({ orgPath, los });
  },
  datasetsTimeSeries: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetDatasetsTimeseries({ orgPath, los });
  },
  dataServicesReport: ({ location }) => {
    const { orgPath } = parseSearchParams(location);
    return memoizedGetDataServicesReport({ orgPath });
  },
  dataServicesTimeSeries: ({ location }) => {
    const { orgPath } = parseSearchParams(location);
    return memoizedGetDataServicesTimeseries({ orgPath });
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
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetConceptsTimeseries({ orgPath, los });
  },
  informationModelsReport: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetInformationModelsReport({ orgPath, los });
  },
  informationModelsTimeSeries: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetInformationModelsTimeseries({ orgPath, los });
  }
};

export const reportPageResolver = resolve(mapProps);

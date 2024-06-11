import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';
import {
  getDatasetsReport,
  getConceptsReport,
  getInformationModelsReport,
  getDataServicesReport
} from '../../api/report-api/reports';
import { parseSearchParams } from '../../lib/location-history-helper';

import { extractConcepts, searchConcepts } from '../../api/search-api/concepts';
import { paramsToSearchBody } from '../../utils/common/index';

const memoizedGetDatasetsReport = memoize(getDatasetsReport);
const memoizedGetDataServicesReport = memoize(getDataServicesReport);
const memoizedGetConceptsReport = memoize(getConceptsReport);
const memoizedGetInformationModelsReport = memoize(getInformationModelsReport);
const memoizedSearchConcepts = memoize(searchConcepts);

const mapProps = {
  datasetsReport: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetDatasetsReport({ orgPath, los });
  },
  dataServicesReport: ({ location }) => {
    const { orgPath } = parseSearchParams(location);
    return memoizedGetDataServicesReport({ orgPath });
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
  informationModelsReport: ({ location }) => {
    const { orgPath, losTheme: los } = parseSearchParams(location);
    return memoizedGetInformationModelsReport({ orgPath, los });
  }
};

export const reportPageResolver = resolve(mapProps);

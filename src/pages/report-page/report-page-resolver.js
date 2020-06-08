import _ from 'lodash';
import { resolve } from 'react-resolver';
import { getDatasetStats } from '../../api/get-dataset-stats';
import { getApiStats } from '../../api/get-api-stats';
import { getConceptStats } from '../../api/get-concept-stats';
import { conceptsSearch, extractConcepts } from '../../api/concepts';
import { getParamFromLocation } from '../../lib/addOrReplaceUrlParam';

const memoizedGetDatasetStats = _.memoize(getDatasetStats);
const memoizedGetApiStats = _.memoize(getApiStats);
const memoizedGetConceptStats = _.memoize(getConceptStats);
const memoizedSearchConcepts = _.memoize(conceptsSearch, JSON.stringify);

const mapProps = {
  datasetStats: ({ location }) =>
    memoizedGetDatasetStats(getParamFromLocation(location, 'orgPath')),
  apiStats: ({ location }) =>
    memoizedGetApiStats(getParamFromLocation(location, 'orgPath')),
  conceptStats: ({ location }) =>
    memoizedGetConceptStats(getParamFromLocation(location, 'orgPath')),
  mostUsedConcepts: async ({ location }) => {
    const conceptStats = await memoizedGetConceptStats(
      getParamFromLocation(location, 'orgPath')
    );
    const datasetCountsByConceptUri = _.get(
      conceptStats,
      'datasetCountsByConceptUri',
      {}
    );

    const mostUsedConceptsArray = _.orderBy(
      datasetCountsByConceptUri,
      [conceptsWithDataset => conceptsWithDataset.length],
      ['desc']
    )
      .reduce((result, value) => {
        result.push(_.get(value, [0, 'subjectUri']));
        return result;
      }, [])
      .slice(0, 4);

    return Promise.resolve(
      memoizedSearchConcepts({ uris: mostUsedConceptsArray.join() })
    ).then(extractConcepts);
  }
};

export const reportPageResolver = resolve(mapProps);

import _ from 'lodash';
import { resolve } from 'react-resolver';
import { ConceptDetailsPage } from './concept-details-page';
import {
  extractFirstConcept,
  paramsToSearchBody as paramsToConceptSearchBody,
  searchConcepts
} from '../../api/search-fulltext-api/concepts';
import {
  paramsToSearchBody as paramsToDatasetSearchBody,
  searchDatasets,
  extractDatasets
} from '../../api/search-fulltext-api/datasets';

const memoizedSearchDatasets = _.memoize(searchDatasets);
const memoizedSearchConcept = _.memoize(searchConcepts);

const mapProps = {
  conceptItem: props =>
    memoizedSearchConcept(
      paramsToConceptSearchBody({ id: props.match.params.id })
    ).then(extractFirstConcept),
  conceptDatasetReferences: async ({
    match: {
      params: { id }
    }
  }) => {
    const currentConcept = await memoizedSearchConcept(
      paramsToConceptSearchBody({ id })
    ).then(extractFirstConcept);
    const { identifier } = currentConcept || {};
    const paramsUris = paramsToDatasetSearchBody({ subject: identifier });
    return memoizedSearchDatasets(paramsUris)
      .then(extractDatasets)
      .catch(() => null);
  }
};

export const ResolvedConceptDetailsPage = resolve(mapProps)(ConceptDetailsPage);

import _ from 'lodash';
import { resolve } from 'react-resolver';
import { ConceptDetailsPage } from './concept-details-page';
import { getConcept } from '../../api/concepts';
import {
  paramsToSearchBody,
  searchDatasets,
  extractDatasets
} from '../../api/search-fulltext-api/datasets';

const memoizedSearchDatasets = _.memoize(searchDatasets);
const memoizedGetConcept = _.memoize(getConcept);

const mapProps = {
  conceptItem: props => memoizedGetConcept(props.match.params.id),
  conceptDatasetReferences: async ({
    match: {
      params: { id }
    }
  }) => {
    const currentConcept = await memoizedGetConcept(id);
    const { identifier } = currentConcept || {};
    const paramsUris = paramsToSearchBody({ subject: identifier });

    return memoizedSearchDatasets(paramsUris)
      .then(extractDatasets)
      .catch(() => null);
  }
};

export const ResolvedConceptDetailsPage = resolve(mapProps)(ConceptDetailsPage);

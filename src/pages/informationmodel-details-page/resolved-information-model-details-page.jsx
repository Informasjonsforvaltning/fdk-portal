import _ from 'lodash';
import { resolve } from 'react-resolver';
import { InformationModelDetailsPage } from './information-model-details-page';
import { getInformationmodel } from '../../api/informationmodels';
import {
  searchDataServices,
  extractDataServices
} from '../../api/search-fulltext-api/dataservices';
import { findAllByKey } from '../../lib/find-by-key';
import {
  extractConcepts,
  paramsToSearchBody,
  searchConcepts
} from '../../api/search-fulltext-api/concepts';
import { addReferencedConceptToItem } from '../../lib/addReferencedConceptToItem';

export const getApiByHarvestSourceUri = harvestSourceUri =>
  searchDataServices({ harvestSourceUri })
    .then(extractDataServices)
    .catch(() => []);

const memoizedGetInformationModel = _.memoize(getInformationmodel);
const memoizedGetApiByHarvestSourceUri = _.memoize(getApiByHarvestSourceUri);
const memoizedSearchConcepts = _.memoize(searchConcepts);

const mapProps = {
  informationModelItem: async props => {
    const informationModelItem = await memoizedGetInformationModel(
      props.match.params.id
    );
    const allReferencedConceptIds = findAllByKey(
      informationModelItem,
      'isDescribedByUri'
    );
    const allReferencedConcepts = await memoizedSearchConcepts(
      paramsToSearchBody({ identifier: allReferencedConceptIds })
    ).then(result => extractConcepts(result));

    addReferencedConceptToItem(informationModelItem, allReferencedConcepts);
    return informationModelItem;
  },
  referencedApis: async props => {
    const informationModelItem = await memoizedGetInformationModel(
      props.match.params.id
    );

    const harvestSourceUri = _.get(informationModelItem, 'harvestSourceUri');

    return Promise.resolve(memoizedGetApiByHarvestSourceUri(harvestSourceUri));
  }
};

export const ResolvedInformationModelDetailsPage = resolve(mapProps)(
  InformationModelDetailsPage
);

import _ from 'lodash';
import { resolve } from 'react-resolver';
import { InformationModelDetailsPage } from './information-model-details-page';
import { getInformationmodel } from '../../api/informationmodels';
import { apisSearch, extractApis } from '../../api/apis';
import { findAllByKey } from '../../lib/find-by-key';
import { conceptsSearch, extractConcepts } from '../../api/concepts';
import { addReferencedConceptToItem } from '../../lib/addReferencedConceptToItem';

export const getApiByHarvestSourceUri = harvestSourceUri =>
  apisSearch({ harvestSourceUri })
    .then(extractApis)
    .catch(() => []);

const memoizedGetInformationModel = _.memoize(getInformationmodel);
const memoizedGetApiByHarvestSourceUri = _.memoize(getApiByHarvestSourceUri);
const memoizedSearchConcepts = _.memoize(conceptsSearch);

const mapProps = {
  informationModelItem: async props => {
    const informationModelItem = await memoizedGetInformationModel(
      props.match.params.id
    );
    const allReferencedConceptIds = findAllByKey(
      informationModelItem,
      'isDescribedByUri'
    );
    const allReferencedConcepts = await memoizedSearchConcepts({
      identifiers: allReferencedConceptIds.join(),
      returnfields: 'definition,publisher,uri'
    }).then(result => extractConcepts(result));

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

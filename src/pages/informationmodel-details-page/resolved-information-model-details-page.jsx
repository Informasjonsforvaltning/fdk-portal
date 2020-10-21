import _ from 'lodash';
import { resolve } from 'react-resolver';
import { InformationModelDetailsPage } from './information-model-details-page';
import { getInformationmodel } from '../../api/informationmodels';
import { findAllByKey } from '../../lib/find-by-key';
import {
  extractConcepts,
  paramsToSearchBody,
  searchConcepts
} from '../../api/search-fulltext-api/concepts';
import { addReferencedConceptToItem } from '../../lib/addReferencedConceptToItem';

const memoizedGetInformationModel = _.memoize(getInformationmodel);
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
  }
};

export const ResolvedInformationModelDetailsPage = resolve(mapProps)(
  InformationModelDetailsPage
);

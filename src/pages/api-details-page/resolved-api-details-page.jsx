import _ from 'lodash';
import first from 'lodash/first';
import { resolve } from 'react-resolver';
import { ApiDetailsPage } from './api-details-page';
import { getApi } from '../../api/apis';
import {
  extractInformationmodels,
  informationmodelsSearch
} from '../../api/informationmodels';
import {
  paramsToSearchBody,
  searchDatasets,
  extractDatasets
} from '../../api/search-fulltext-api/datasets';

const memoizedGetApi = _.memoize(getApi);
const memoizedSearchDatasets = _.memoize(searchDatasets);

const getInformationModelByHarvestSourceUri = harvestSourceUri =>
  informationmodelsSearch({ harvestSourceUri })
    .then(extractInformationmodels)
    .then(first);

const memoizedGetInformationModelByHarvestSourceUri = _.memoize(
  getInformationModelByHarvestSourceUri
);

// todo when we migrate to dcat 2.0, we can have more reasonably link together datasets and apis,
//  right now it is api id stored in that peculiar property.
const mapProps = {
  apiItem: props => memoizedGetApi(props.match.params.id),
  referencedDatasets: async ({
    match: {
      params: { id }
    }
  }) => {
    const currentApi = await memoizedGetApi(id);

    const uriArray = (currentApi?.datasetReferences || []).map(
      item => item.uri
    );
    const paramsUris = paramsToSearchBody({ uris: uriArray });
    const paramsAccessService = paramsToSearchBody({ accessService: id });

    return (uriArray?.length > 0
      ? await memoizedSearchDatasets(paramsUris)
          .then(extractDatasets)
          .catch(() => null)
      : []
    )
      .concat(
        await memoizedSearchDatasets(paramsAccessService)
          .then(extractDatasets)
          .catch(() => null)
      )
      .filter(Boolean);
  },
  referencedInformationModels: async props => {
    const apiItem = await memoizedGetApi(props.match.params.id);

    const harvestSourceUri = _.get(apiItem, 'harvestSourceUri');

    const informationmodel = await memoizedGetInformationModelByHarvestSourceUri(
      harvestSourceUri
    );

    // this method returns list of referenced information models, but our current api gives one
    return informationmodel ? [informationmodel] : [];
  }
};

export const ResolvedApiDetailsPage = resolve(mapProps)(ApiDetailsPage);

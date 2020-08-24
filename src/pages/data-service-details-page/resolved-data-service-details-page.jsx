import _ from 'lodash';
import first from 'lodash/first';
import { resolve } from 'react-resolver';
import { DataServiceDetailsPage } from './data-service-details-page';
import {
  searchDataServices,
  extractDataServices
} from '../../api/search-fulltext-api/dataservices';
import {
  extractInformationmodels,
  informationmodelsSearch
} from '../../api/informationmodels';
import {
  paramsToSearchBody,
  searchDatasets,
  extractDatasets
} from '../../api/search-fulltext-api/datasets';

const getInformationModelByHarvestSourceUri = harvestSourceUri =>
  informationmodelsSearch({ harvestSourceUri })
    .then(extractInformationmodels)
    .then(first);

const memoizedSearchDataServices = _.memoize(searchDataServices);
const memoizedSearchDatasets = _.memoize(searchDatasets);
const memoizedGetInformationModelByHarvestSourceUri = _.memoize(
  getInformationModelByHarvestSourceUri
);

// todo when we migrate to dcat 2.0, we can have more reasonably link together datasets and apis,
//  right now it is api id stored in that peculiar property.
const mapProps = {
  dataServiceItem: async ({
    match: {
      params: { id }
    }
  }) => {
    const dataServices = await memoizedSearchDataServices({
      filters: [{ _id: id }]
    }).then(extractDataServices);

    return Array.isArray(dataServices) ? dataServices[0] : null;
  },
  referencedDatasets: async ({
    match: {
      params: { id }
    }
  }) => {
    const currentApi = await memoizedSearchDataServices({
      filters: [{ _id: id }]
    });
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
    const dataServices = await memoizedSearchDataServices({
      q: props.match.params.id
    }).then(extractDataServices);

    const harvestSourceUri = _.get(dataServices, ['0', 'harvestSourceUri']);

    if (harvestSourceUri) {
      const informationmodel = await memoizedGetInformationModelByHarvestSourceUri(
        harvestSourceUri
      );

      return informationmodel ? [informationmodel] : [];
    }

    // this method returns list of referenced information models, but our current api gives one
    return [];
  }
};

export const ResolvedDataServiceDetailsPage = resolve(mapProps)(
  DataServiceDetailsPage
);

import _ from 'lodash';
import { resolve } from 'react-resolver';
import { getPublisherByOrgNr } from '../../api/search-api/publishers';
import { getDatasetByURI } from '../../api/search-api/datasets';

const memoizedGetPublisherByOrgNr = _.memoize(getPublisherByOrgNr);
const memoizedGetDatasetByURI = _.memoize(getDatasetByURI);

const mapProps = {
  publisher: props =>
    memoizedGetPublisherByOrgNr(_.get(props.match, ['params', 'catalogId'])),
  referencedDatasets: props =>
    Promise.all(
      _.get(props.item, 'datasetUris', []).map(memoizedGetDatasetByURI)
    )
};

export const apiRegistrationResolver = resolve(mapProps);

import axios from 'axios';
import cleanDeep from 'clean-deep';

import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_EVENTS,
  PATHNAME_SERVICES
} from '../../../constants/constants';
import { getConfig } from '../../../config';

interface Props {
  path: string;
  method: any;
}

export const resourceApi = ({ path, method }: Props) =>
  axios({
    url: `${getConfig().resourceApi.host}${
      path.startsWith('/') ? '' : '/'
    }${path}`,
    method
  })
    .then(({ data }) => cleanDeep(data))
    .catch(() => null);

export const getConcept = (id: string) =>
  resourceApi({ path: `${PATHNAME_CONCEPTS}/${id}`, method: 'GET' });

export const getDataset = (id: string) =>
  resourceApi({ path: `${PATHNAME_DATASETS}/${id}`, method: 'GET' });

export const getDataService = (id: string) =>
  resourceApi({ path: `${PATHNAME_DATA_SERVICES}/${id}`, method: 'GET' });

export const getPublicService = (id: string) =>
  resourceApi({ path: `${PATHNAME_SERVICES}/${id}`, method: 'GET' });

export const getEvent = (id: string) =>
  resourceApi({ path: `${PATHNAME_EVENTS}/${id}`, method: 'GET' });

import axios from 'axios';
import cleanDeep from 'clean-deep';

import env from '../../../env';

const { SEARCH_API_HOST } = env;

interface Props {
  path: string;
  method: any;
}

export const harvesterBffApi = ({ path, method }: Props) =>
  axios({
    url: `${SEARCH_API_HOST}${path}`,
    method
  })
    .then(({ data }) => cleanDeep(data))
    .catch(() => null);

export const getConcept = (id: string) =>
  harvesterBffApi({ path: `/concepts/${id}`, method: 'GET' });

export const getDataset = (id: string) =>
  harvesterBffApi({ path: `/datasets/${id}`, method: 'GET' });

export const getDataService = (id: string) =>
  harvesterBffApi({ path: `/dataservices/${id}`, method: 'GET' });

export const getPublicService = (id: string) =>
  harvesterBffApi({ path: `/public-services/${id}`, method: 'GET' });

export const getEvent = (id: string) =>
  harvesterBffApi({ path: `/events/${id}`, method: 'GET' });

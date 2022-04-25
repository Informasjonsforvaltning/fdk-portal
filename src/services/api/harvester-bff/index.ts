import axios, { AxiosResponse } from 'axios';

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
    .then(({ data }): AxiosResponse => data)
    .catch(() => null);

export const getConcept = (id: string) =>
  harvesterBffApi({ path: `/concepts/${id}`, method: 'GET' });

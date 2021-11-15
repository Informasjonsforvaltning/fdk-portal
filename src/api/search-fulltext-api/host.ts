import axios from 'axios';
import cleanDeep from 'clean-deep';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  data?: any;
  params?: URLSearchParams;
}

export const searchFullTextApi = ({ path, method, data, params }: Props) =>
  axios({
    url: `${getConfig().searchFullTextApi.host}${path}`,
    method,
    data,
    params
  })
    .then(response => cleanDeep(response.data))
    .catch(() => null);

export const searchFullTextApiPost = (path: string, body: any) =>
  searchFullTextApi({ path, method: 'POST', data: body });

export const searchFullTextApiGet = (path: string, params?: URLSearchParams) =>
  searchFullTextApi({ path, method: 'GET', params });

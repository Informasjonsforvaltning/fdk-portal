import axios from 'axios';
import cleanDeep from 'clean-deep';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  data?: any;
  params?: URLSearchParams;
}

export const searchApi = ({ path, method, data, params }: Props) =>
  axios({
    url: `${getConfig().searchApi.host}/search${path}`,
    method,
    data,
    params
  })
    .then(response => cleanDeep(response.data))
    .catch(() => null);

export const searchApiPost = (path: string, body: any) =>
  searchApi({ path, method: 'POST', data: body });

export const searchApiGet = (path: string, params?: URLSearchParams) =>
  searchApi({ path, method: 'GET', params });

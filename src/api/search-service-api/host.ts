import axios from 'axios';
import cleanDeep from 'clean-deep';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  data?: any;
  params?: URLSearchParams;
}

export const searchServiceApi = ({ path, method, data, params }: Props) =>
  axios({
    url: `${getConfig().resourceApi.host}${
      path.startsWith('/') ? '' : '/'
    }${path}`,
    method,
    data,
    params
  })
    .then(response => cleanDeep(response.data))
    // eslint-disable-next-line no-console
    .catch(e => console.error('searchServiceApi', e));

export const searchServiceApiPost = (path: string, body: any) =>
  searchServiceApi({ path, method: 'POST', data: body });

export const searchServiceApiGet = (path: string, params?: URLSearchParams) =>
  searchServiceApi({ path, method: 'GET', params });

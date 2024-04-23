import axios from 'axios';
import cleanDeep from 'clean-deep';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  data?: any;
  params?: URLSearchParams;
}

export const resourceServiceApi = ({ path, method, data, params }: Props) =>
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

export const resourceServiceApiPost = (path: string, body: any) =>
  resourceServiceApi({ path, method: 'POST', data: body });

export const resourceServiceApiGet = (path: string) =>
  resourceServiceApi({ path, method: 'GET' });

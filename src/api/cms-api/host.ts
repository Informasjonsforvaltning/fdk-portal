import axios from 'axios';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  data?: any;
}

export const cmsApi = ({ path, method, data }: Props) =>
  axios({
    url: `${getConfig().cmsApi.host}/api/content${path}`,
    headers: {
      'Content-Type': 'application/vnd.api+json'
    },
    method,
    data
  }).then(response => response.data);

export const cmsApiGet = (path: string) => cmsApi({ path, method: 'GET' });

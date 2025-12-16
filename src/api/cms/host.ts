import axios from 'axios';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  params: any;
}

export const cmsApi = ({ path, method, params }: Props) =>
  axios({
    url: `${getConfig().cmsV2Api.host}${path}`,
    method,
    params: {
      ...params
    }
  })
    .then(({ data }) => data)
    .catch(() => {});

export const cmsApiGet = (path: string, params: any) =>
  cmsApi({ path, method: 'GET', params });

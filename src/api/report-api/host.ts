import axios from 'axios';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  data?: any;
}

export const reportApi = ({ path, method, data }: Props) =>
  axios({
    url: `${getConfig().reportApi.host}${path}`,
    method,
    data
  }).then(response => response.data);

export const reportApiGet = (path: string) =>
  reportApi({ path, method: 'GET' });

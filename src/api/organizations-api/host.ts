import axios from 'axios';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  data?: any;
}

export const organizationsApi = ({ path, method, data }: Props) =>
  axios({
    url: `${getConfig().organizationsApi.host}${path}`,
    method,
    data
  }).then(({ data }) => data);

export const organizationsApiGet = (path: string) =>
  organizationsApi({ path, method: 'GET' });

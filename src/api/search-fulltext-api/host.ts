import axios from 'axios';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  data?: any;
}

export const searchFullTextApi = ({ path, method, data }: Props) =>
  axios({
    url: `${getConfig().searchFullTextApi.host}${path}`,
    method,
    data
  }).then(response => response.data);

export const searchFullTextApiPost = (path: string, body: any) =>
  searchFullTextApi({ path, method: 'POST', data: body });

export const searchFullTextApiGet = (path: string) =>
  searchFullTextApi({ path, method: 'GET' });

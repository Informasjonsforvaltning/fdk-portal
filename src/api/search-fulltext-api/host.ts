import axios from 'axios';
import cleanDeep from 'clean-deep';
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
  })
    .then(response => cleanDeep(response.data))
    .catch(() => null);

export const searchFullTextApiPost = (path: string, body: any) =>
  searchFullTextApi({ path, method: 'POST', data: body });

export const searchFullTextApiGet = (path: string) =>
  searchFullTextApi({ path, method: 'GET' });

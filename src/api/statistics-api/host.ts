import axios from 'axios';
import cleanDeep from 'clean-deep';
import { getConfig } from '../../config';
import type { TimeSeriesRequest } from '../../types';

interface Props {
  path: string;
  method: any;
  data?: any;
  params?: URLSearchParams;
}

export const statisticsApi = ({ path, method, data, params }: Props) =>
  axios({
    url: `${getConfig().statisticsApi.host}/${path}`,
    method,
    data,
    params
  })
    .then(response => cleanDeep(response.data))
    .catch(() => null);

export const statisticsApiPost = (path: string, body: TimeSeriesRequest) =>
  statisticsApi({ path, method: 'POST', data: body });

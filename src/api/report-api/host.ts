import axios from 'axios';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  params: any;
}

// Filter out NAP data if filterTransportDatasets in conf is true
const transportProfileIfNeeded = () =>
  getConfig().filterTransportDatasets
    ? {
        themeprofile: 'transport'
      }
    : undefined;

export const reportApi = ({ path, method, params }: Props) =>
  axios({
    url: `${getConfig().reportApi.host}${path}`,
    method,
    params: {
      ...params,
      ...transportProfileIfNeeded()
    }
  })
    .then(({ data }) => data)
    .catch(() => {});

export const reportApiGet = (path: string, params: any) =>
  reportApi({ path, method: 'GET', params });

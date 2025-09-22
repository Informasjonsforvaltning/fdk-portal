import axios from 'axios';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  params: any;
}

// Filter out NAP data if isNapProfile in conf is true
const transportProfileIfNeeded = () =>
  getConfig().isNapProfile
    ? {
        themeprofile: 'transport'
      }
    : undefined;

export const reportApi = ({ path, method, params }: Props) =>
  axios({
    url: `${getConfig().organizationsApi.host}${path}`,
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

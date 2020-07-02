import axios from 'axios';
import { getConfig } from '../../config';

interface Props {
  path: string;
  method: any;
  data?: any;
}

export const organizationsCatalogApi = ({ path, method, data }: Props) =>
  axios({
    url: `${getConfig().organizationsCatalogApi.host}${path}`,
    headers: {
      Accept: 'application/json'
    },
    method,
    data
  })
    .then(({ data }) => data)
    .catch(() => null);

export const organizationsCatalogApiGet = (path: string) =>
  organizationsCatalogApi({ path, method: 'GET' });

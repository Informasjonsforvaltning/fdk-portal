import axios from 'axios';

interface Props {
  path: string;
  method: any;
  data?: any;
}

const CMS_API_HOST = 'https://cms-fellesdatakatalog.digdir.no/api/content';

export const cmsApi = ({ path, method, data }: Props) =>
  axios({
    url: `${CMS_API_HOST}${path}`,
    headers: {
      'Content-Type': 'application/vnd.api+json'
    },
    method,
    data
  }).then(response => response.data);

export const cmsApiGet = (path: string) => cmsApi({ path, method: 'GET' });

import { cmsApiGet } from './host';

export const getTransportArticles = (params: any = '') =>
  cmsApiGet('/api/transport-articles', params);

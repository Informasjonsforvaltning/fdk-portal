import { cmsApiGet } from './host';

export const getServiceMessages = (params: any = '') =>
  cmsApiGet('/api/service-messages', params);

export const getServiceMessage = (id: string, params: any = '') =>
  cmsApiGet(`/api/service-messages/${id}`, params);

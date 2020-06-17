import { reportApiGet } from './host';

export const getDatasetsReport = (params: any = '') =>
  reportApiGet('/report/datasets', params);

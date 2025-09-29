import { reportApiGet } from './host';

export const getDatasetsReport = (params: any = '') =>
  reportApiGet('/reports/datasets', params);

export const getConceptsReport = (params: any = '') =>
  reportApiGet('/reports/concepts', params);

export const getInformationModelsReport = (params: any = '') =>
  reportApiGet('/reports/information-models', params);

export const getDataServicesReport = (params: any = '') =>
  reportApiGet('/reports/data-services', params);

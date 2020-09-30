import { reportApiGet } from './host';

export const getDatasetsReport = (params: any = '') =>
  reportApiGet('/report/datasets', params);

export const getConceptsReport = (params: any = '') =>
  reportApiGet('/report/concepts', params);

export const getInformationModelsReport = (params: any = '') =>
  reportApiGet('/report/informationmodels', params);

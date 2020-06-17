import qs from 'qs';
import { reportApiGet } from './host';

export const getDatasetsReport = (params: any = '') =>
  reportApiGet(
    `/report/datasets${qs.stringify(params, { addQueryPrefix: true })}`
  );

export const extractDatasetReport = ({ hits = [] }: any) => hits;

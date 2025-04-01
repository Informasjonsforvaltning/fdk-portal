import { searchApiPost } from './host';
import { Dataset } from '../../types';

export const searchDatasets = (body: any) =>
  searchApiPost('search/datasets', body);

export const extractDatasets = (searchResponse: any) =>
  searchResponse?.hits ?? [];

export const extractDatasetAggregations = (searchResponse: any) =>
  searchResponse.aggregations ?? [];

export const extractDatasetsTotal = (searchResponse: any) =>
  searchResponse?.page?.totalElements ?? 0;

export const extractFirstDataset = (searchResponse: any): Dataset | undefined =>
  searchResponse?.hits?.[0];

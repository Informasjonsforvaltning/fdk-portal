import { searchApiPost } from './host';
import { DataService } from '../../types';

export const searchDataServices = (body: any) =>
  searchApiPost('/dataservices', body);

export const extractDataServices = (searchResponse: any) =>
  searchResponse?.hits ?? [];

export const extractDataServiceAggregations = (searchResponse: any) =>
  searchResponse.aggregations ?? [];
export const extractDataServicesTotal = (searchResponse: any) =>
  searchResponse?.page?.totalElements ?? 0;

export const extractFirstDataService = (
  searchResponse: any
): DataService | undefined => searchResponse?.hits?.[0];

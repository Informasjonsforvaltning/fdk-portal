import { searchApiPost } from './host';
import { PublicService } from '../../types';

export const searchPublicServices = (body: any) =>
  searchApiPost('search/public-services', body);

export const extractPublicServices = (searchResponse: any) =>
  searchResponse?.hits ?? [];

export const extractPublicServicesAggregations = (searchResponse: any) =>
  searchResponse.aggregations ?? {};

export const extractPublicServicesPage = (searchResponse: any) =>
  searchResponse.page ?? {};

export const extractFirstPublicService = (
  searchResponse: any
): PublicService | undefined => searchResponse?.hits?.[0];

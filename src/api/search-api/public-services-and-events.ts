import { searchApiPost } from './host';

export const searchPublicServicesAndEvents = (body: any) =>
  searchApiPost('/public-services-and-events', body);

export const extractPublicServicesAndEvents = (searchResponse: any) =>
  searchResponse?.hits ?? [];

export const extractPublicServicesAndEventsAggregations = (
  searchResponse: any
) => searchResponse.aggregations ?? {};

export const extractPublicServicesAndEventsPage = (searchResponse: any) =>
  searchResponse.page ?? {};

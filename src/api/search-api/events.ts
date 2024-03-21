import { searchApiPost } from './host';
import { Event } from '../../types';

export const searchEvents = (body: any) => searchApiPost('/events', body);

export const extractEvents = (searchResponse: any) =>
  searchResponse?.hits ?? [];

export const extractEventsAggregations = (searchResponse: any) =>
  searchResponse.aggregations ?? {};

export const extractEventsPage = (searchResponse: any) =>
  searchResponse.page ?? {};

export const extractFirstEvent = (searchResponse: any): Event | undefined =>
  searchResponse?.hits?.[0];

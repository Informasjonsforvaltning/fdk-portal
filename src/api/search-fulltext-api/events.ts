import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';

const mapSorting = ({ sortfield }: any) =>
  sortfield === 'harvest.firstHarvested'
    ? { field: 'harvest.firstHarvested', direction: 'desc' }
    : undefined;

const mapFilters = ({ id }: any) => {
  const filters = [];
  if (id) {
    filters.push({ _id: id });
  }

  return filters.length > 0 ? filters : undefined;
};

export const searchEvents = (body: any) =>
  searchFullTextApiPost('/events', body);

export const paramsToSearchBody = ({ q, page, size, ...params }: any) => ({
  q,
  page: page ? Number(page) : undefined,
  size,
  sorting: mapSorting(params),
  filters: mapFilters(params)
});

export const extractEvents = (searchResponse: any) => searchResponse.hits ?? [];

export const extractEventsAggregations = (searchResponse: any) =>
  normalizeAggregations(searchResponse).aggregations ?? {};

export const extractEventsPage = (searchResponse: any) =>
  searchResponse.page ?? {};

export const extractFirstEvent = ({ hits = [] }: any) => hits[0] ?? {};

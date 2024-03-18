import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';
import { Event } from '../../types';
import { buildFirstHarvestSortBody } from '../../utils/common';

const mapFilters = ({ id, relation, uris }: any) => {
  const filters = [];
  if (id) {
    filters.push({ _id: id });
  }

  if (relation) {
    filters.push({
      'relation.keyword': relation
    });
  }

  if (uris) {
    filters.push({
      collection: {
        field: 'uri',
        values: uris
      }
    });
  }

  return filters.length > 0 ? filters : undefined;
};

export const searchEvents = (body: any) =>
  searchFullTextApiPost('/events', body);

export const paramsToSearchBody = ({ q, page, size, ...params }: any) => ({
  q,
  pagination: {
    page: page ? Number(page) : undefined,
    size: size ? Number(size) : undefined
  },
  sorting: buildFirstHarvestSortBody(params),
  filters: mapFilters(params)
});

export const extractEvents = (searchResponse: any) =>
  searchResponse?.hits ?? [];

export const extractEventsAggregations = (searchResponse: any) =>
  normalizeAggregations(searchResponse).aggregations ?? {};

export const extractEventsPage = (searchResponse: any) =>
  searchResponse.page ?? {};

export const extractFirstEvent = (searchResponse: any): Event | undefined =>
  searchResponse?.hits?.[0];

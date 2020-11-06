import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';

const mapSorting = ({ sortfield }: any) =>
  sortfield === 'modified'
    ? { field: 'harvest.firstHarvested', direction: 'desc' }
    : undefined;

const mapFilters = ({ id, identifiers, uri, orgPath, last_x_days }: any) => {
  const filters = [];
  if (id) {
    filters.push({ _id: id });
  }
  if (identifiers) {
    filters.push({
      collection: {
        field: 'identifier.keyword',
        values: identifiers
      }
    });
  }
  if (uri) {
    filters.push({
      collection: {
        field: 'uri',
        values: uri
      }
    });
  }
  if (orgPath) {
    filters.push({ orgPath });
  }
  if (last_x_days) {
    filters.push({ last_x_days });
  }
  return filters.length > 0 ? filters : undefined;
};

export const searchConcepts = (body: any) =>
  searchFullTextApiPost('/concepts', body);

export const extractConcepts = ({ hits = [] }: any) => hits;

export const extractConceptAggregations = (searchResponse: any) =>
  normalizeAggregations(searchResponse).aggregations ?? [];

export const extractConceptsTotal = (searchResponse: any) =>
  searchResponse?.page?.totalElements ?? 0;

export const paramsToSearchBody = ({ q, page, size, ...params }: any) => ({
  q,
  page: page ? Number(page) : undefined,
  size,
  sorting: mapSorting(params),
  filters: mapFilters(params)
});

export const extractFirstConcept = ({ hits = [] }: any) => hits[0] ?? {};

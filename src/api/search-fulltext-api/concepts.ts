import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';

const mapSorting = ({ sortfield }: any) =>
  sortfield === 'modified'
    ? { field: 'harvest.firstHarvested', direction: 'desc' }
    : undefined;

const mapFilters = ({ id, identifier, orgPath }: any) => {
  const filters = [];
  if (id) {
    filters.push({ _id: id });
  }
  if (identifier) {
    filters.push({
      collection: {
        field: 'identifier.keyword',
        values: identifier
      }
    });
  }
  if (orgPath) {
    filters.push({ orgPath });
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

export const paramsToSearchBody = ({ q, page, ...params }: any) => ({
  q,
  page: page ? Number(page) : undefined,
  sorting: mapSorting(params),
  filters: mapFilters(params)
});

export const extractFirstConcept = ({ hits = [] }: any) => hits[0] ?? {};
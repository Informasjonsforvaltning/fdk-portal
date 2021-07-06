import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';
import { Concept } from '../../types';

const mapSorting = ({ sortfield }: any) =>
  sortfield === 'harvest.firstHarvested'
    ? { field: 'harvest.firstHarvested', direction: 'desc' }
    : undefined;

const mapFilters = ({
  id,
  identifiers,
  uri,
  orgPath,
  last_x_days,
  seeAlso,
  organizationNumber
}: any) => {
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
  if (seeAlso) {
    filters.push({
      'seeAlso.keyword': seeAlso
    });
  }

  if (/^\d{9}$/.test(organizationNumber ?? '')) {
    filters.push({
      'publisher.id.keyword': organizationNumber
    });
  }

  return filters.length > 0 ? filters : undefined;
};

export const searchConcepts = (body: any) =>
  searchFullTextApiPost('/concepts', body);

export const extractConcepts = (searchResponse: any) =>
  searchResponse?.hits ?? [];

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

export const extractFirstConcept = (searchResponse: any): Concept | undefined =>
  searchResponse?.hits?.[0];

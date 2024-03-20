import { searchApiPost } from './host';
import { Concept } from '../../types';
import { buildFirstHarvestSortBody } from '../../utils/common';

const mapFilters = ({
  id,
  identifiers,
  uri,
  orgPath,
  last_x_days,
  seeAlso
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

  return filters.length > 0 ? filters : undefined;
};

export const searchConcepts = (body: any) => searchApiPost('/concepts', body);

export const extractConcepts = (searchResponse: any) =>
  searchResponse?.hits ?? [];

export const extractConceptAggregations = (searchResponse: any) =>
  searchResponse.aggregations ?? [];

export const extractConceptsTotal = (searchResponse: any) =>
  searchResponse?.page?.totalElements ?? 0;

export const paramsToSearchBody = ({ q, page, size, ...params }: any) => ({
  q,
  pagination: {
    page: page ? Number(page) : undefined,
    size: size ? Number(size) : undefined
  },
  sorting: buildFirstHarvestSortBody(params),
  filters: mapFilters(params)
});

export const extractFirstConcept = (searchResponse: any): Concept | undefined =>
  searchResponse?.hits?.[0];
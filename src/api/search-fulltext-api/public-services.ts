import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';

const mapSorting = ({ sortfield }: any) =>
  sortfield === 'harvest.firstHarvested'
    ? { field: 'harvest.firstHarvested', direction: 'desc' }
    : undefined;

const mapFilters = ({
  id,
  identifiers,
  uri,
  last_x_days,
  orgPath,
  isGroupedBy,
  keywords,
  publicServiceIdentifiers,
  requiredByServiceUri
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
  if (last_x_days) {
    filters.push({ last_x_days });
  }
  if (orgPath) {
    filters.push({
      collection: {
        field: 'hasCompetentAuthority.orgPath',
        values: [orgPath]
      }
    });
  }
  if (isGroupedBy) {
    filters.push({
      collection: {
        field: 'isGroupedBy.uri.keyword',
        values: [isGroupedBy]
      }
    });
  }
  if (keywords) {
    filters.push({ keywords });
  }
  if (
    Array.isArray(publicServiceIdentifiers) &&
    publicServiceIdentifiers.length > 0
  ) {
    filters.push({
      collection: {
        field: 'uri',
        values: publicServiceIdentifiers
      }
    });
  }
  if (requiredByServiceUri) {
    filters.push({ required_by_service: requiredByServiceUri });
  }
  return filters.length > 0 ? filters : undefined;
};

export const searchPublicServices = (body: any) =>
  searchFullTextApiPost('/public-services', body);

export const paramsToSearchBody = ({ q, page, size, ...params }: any) => ({
  q,
  page: page ? Number(page) : undefined,
  size,
  sorting: mapSorting(params),
  filters: mapFilters(params)
});

export const extractPublicServices = (searchResponse: any) =>
  searchResponse.hits ?? [];

export const extractPublicServicesAggregations = (searchResponse: any) =>
  normalizeAggregations(searchResponse).aggregations ?? {};

export const extractPublicServicesPage = (searchResponse: any) =>
  searchResponse.page ?? {};

export const extractFirstPublicService = ({ hits = [] }: any) => hits[0] ?? {};

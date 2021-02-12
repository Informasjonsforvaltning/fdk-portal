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
  event
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
  if (event) {
    filters.push({ event });
  }
  return filters.length > 0 ? filters : undefined;
};

export const searchPublicServicesAndEvents = (body: any) =>
  searchFullTextApiPost('/public-services-and-events', body);

export const paramsToSearchBody = ({ q, page, size, ...params }: any) => ({
  q,
  page: page ? Number(page) : undefined,
  size,
  sorting: mapSorting(params),
  filters: mapFilters(params)
});

export const extractPublicServicesAndEvents = (searchResponse: any) =>
  searchResponse.hits ?? [];

export const extractPublicServicesAndEventsAggregations = (
  searchResponse: any
) => normalizeAggregations(searchResponse).aggregations ?? {};

export const extractPublicServicesAndEventsPage = (searchResponse: any) =>
  searchResponse.page ?? {};

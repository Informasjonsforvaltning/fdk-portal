import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';

const mapSorting = ({ sortfield }: any) =>
  sortfield === 'harvest.firstHarvested'
    ? { field: 'harvest.firstHarvested', direction: 'desc' }
    : undefined;

const mapFilters = ({
  id,
  losTheme: los,
  orgPath,
  theme,
  opendata,
  accessrights: accessRights,
  spatial,
  provenance,
  format,
  dataseturi,
  last_x_days,
  endpointDescription
}: any) => {
  const filters = [];
  if (id) {
    filters.push({ _id: id });
  }
  if (los) {
    filters.push({ los });
  }
  if (orgPath) {
    filters.push({ orgPath });
  }
  if (theme) {
    filters.push({ theme });
  }
  if (opendata) {
    filters.push({ opendata });
  }
  if (accessRights) {
    filters.push({ accessRights });
  }
  if (spatial) {
    filters.push({ spatial });
  }
  if (provenance) {
    filters.push({ provenance });
  }
  if (format) {
    filters.push({
      collection: {
        field: 'mediaType.code.keyword',
        values: format.split(',')
      }
    });
  }
  if (dataseturi) {
    filters.push({ 'servesDataset.keyword': dataseturi });
  }
  if (last_x_days) {
    filters.push({ last_x_days });
  }
  if (endpointDescription) {
    filters.push({ 'endpointDescription.keyword': endpointDescription });
  }

  return filters.length > 0 ? filters : undefined;
};

export const searchDataServices = (body: any) =>
  searchFullTextApiPost('/dataservices', body);

export const extractDataServices = ({ hits = [] }: any) => hits;

export const extractDataServiceAggregations = (searchResponse: any) =>
  normalizeAggregations(searchResponse).aggregations ?? [];

export const extractDataServicesTotal = (searchResponse: any) =>
  searchResponse?.page?.totalElements ?? 0;

export const paramsToSearchBody = ({ q, page, size, ...params }: any) => ({
  q,
  page: page ? Number(page) : undefined,
  size,
  sorting: mapSorting(params),
  filters: mapFilters(params)
});

export const extractFirstDataService = ({ hits = [] }: any) => hits[0];

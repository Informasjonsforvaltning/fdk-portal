import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';

const mapSorting = ({ sortfield }: any) =>
  sortfield === 'modified'
    ? { field: 'harvest.firstHarvested', direction: 'desc' }
    : undefined;

const mapFilters = ({
  losTheme: los,
  orgPath,
  theme,
  opendata,
  accessrights: accessRights,
  spatial,
  provenance,
  format,
  dataseturi,
  last_x_days
}: any) => {
  const filters = [];
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

  return filters.length > 0 ? filters : undefined;
};

export const searchDataServices = (body: any) =>
  searchFullTextApiPost('/dataservices', body);

export const extractDataServices = ({ hits = [] }: any) => hits;

export const extractDataServiceAggregations = (searchResponse: any) =>
  normalizeAggregations(searchResponse).aggregations ?? [];

export const extractDataServicesTotal = (searchResponse: any) =>
  searchResponse?.page?.totalElements ?? 0;

export const paramsToSearchBody = ({ q, page, ...params }: any) => ({
  q,
  page: page ? Number(page) : undefined,
  sorting: mapSorting(params),
  filters: mapFilters(params)
});

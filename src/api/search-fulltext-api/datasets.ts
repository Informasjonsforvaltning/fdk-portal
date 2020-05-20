import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';

export const searchDatasets = (body: any) =>
  searchFullTextApiPost('/datasets', body);

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
  provenance
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
  return filters.length > 0 ? filters : undefined;
};

export const paramsToSearchBody = ({ q, page, ...params }: any) => ({
  q,
  page: page ? Number(page) : undefined,
  sorting: mapSorting(params),
  filters: mapFilters(params)
});

export const extractDatasets = ({ hits = [] }: any) => hits;

export const extractDatasetAggregations = (searchResponse: any) =>
  normalizeAggregations(searchResponse).aggregations ?? [];

export const extractDatasetsTotal = (searchResponse: any) =>
  searchResponse.page.totalElements ?? 0;

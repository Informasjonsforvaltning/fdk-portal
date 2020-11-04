import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';

export const searchInformationModels = (body: any) =>
  searchFullTextApiPost('/informationmodels', body);

const mapSorting = ({ sortfield }: any) =>
  sortfield === 'modified'
    ? { field: 'harvest.firstHarvested', direction: 'desc' }
    : undefined;

const mapFilters = ({
  id,
  losTheme: los,
  orgPath,
  conceptIdentifiers
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

  if (conceptIdentifiers) {
    filters.push(conceptIdentifiers);
  }

  return filters.length > 0 ? filters : undefined;
};

export const paramsToSearchBody = ({ q, page, size, ...params }: any) => {
  const body = {
    q,
    page: page ? Number(page) : undefined,
    size,
    sorting: mapSorting(params),
    filters: mapFilters(params)
  };
  return body;
};

export const extractInformationModels = (searchResponse: any) =>
  searchResponse.hits ?? [];

export const extractInformationModelsAggregations = (searchResponse: any) =>
  normalizeAggregations(searchResponse).aggregations ?? [];

export const extractFirstInformationModel = ({ hits: [hit = {}] = [] }: any) =>
  hit;

import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';

export const searchInformationModels = (body: any) =>
  searchFullTextApiPost('/informationmodels', body);

const mapSorting = ({ sortfield }: any) =>
  sortfield === 'harvest.firstHarvested'
    ? { field: 'harvest.firstHarvested', direction: 'desc' }
    : undefined;

const mapFilters = ({
  id,
  losTheme: los,
  orgPath,
  conceptIdentifiers,
  last_x_days,
  keywords
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

  if (keywords) {
    filters.push({ keywords });
  }

  if (Array.isArray(conceptIdentifiers) && conceptIdentifiers.length > 0) {
    filters.push({
      collection: {
        field: 'containsSubjects',
        values: conceptIdentifiers
      }
    });
  }
  if (last_x_days) {
    filters.push({ last_x_days });
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

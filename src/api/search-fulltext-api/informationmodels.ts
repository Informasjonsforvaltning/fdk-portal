import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';
import { InformationModel } from '../../types';

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
  informationModelIdentifiers,
  last_x_days,
  keywords,
  relations,
  organizationNumber
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
        field: 'containsSubjects.keyword',
        values: conceptIdentifiers
      }
    });
  }

  if (
    Array.isArray(informationModelIdentifiers) &&
    informationModelIdentifiers.length > 0
  ) {
    filters.push({
      collection: {
        field: 'uri',
        values: informationModelIdentifiers
      }
    });
  }

  if (last_x_days) {
    filters.push({ last_x_days });
  }

  if (relations) {
    filters.push({ informationmodel_relation: relations });
  }

  if (/^\d{9}$/.test(organizationNumber ?? '')) {
    filters.push({
      'publisher.id.keyword': organizationNumber
    });
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
  searchResponse?.hits ?? [];

export const extractInformationModelsAggregations = (searchResponse: any) =>
  normalizeAggregations(searchResponse).aggregations ?? [];

export const extractFirstInformationModel = (
  searchResponse: any
): InformationModel | undefined => searchResponse?.hits?.[0];

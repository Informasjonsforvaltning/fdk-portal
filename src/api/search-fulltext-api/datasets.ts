import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';
import { getConfig } from '../../config';
import { Dataset } from '../../types';

export const searchDatasets = (body: any) =>
  searchFullTextApiPost('/datasets', body);

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
  uris,
  accessService,
  subject,
  last_x_days,
  format,
  subjectExists,
  catalog_name,
  keywords,
  info_model,
  referencesSource,
  conformsTo,
  relatedToInfoModel,
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
  if (uris) {
    filters.push({
      collection: {
        field: 'uri',
        values: uris
      }
    });
  }
  if (accessService) {
    filters.push({
      collection: {
        field: 'distribution.accessService.endpointDescription.uri.keyword',
        values: [accessService]
      }
    });
  }
  if (subject) {
    filters.push({
      collection: {
        field: 'subject.identifier.keyword',
        values: [subject]
      }
    });
  }
  if (last_x_days) {
    filters.push({ last_x_days });
  }
  if (subjectExists) {
    filters.push({
      exists: 'subject'
    });
  }
  if (catalog_name) {
    filters.push({
      catalog_name
    });
  }
  if (keywords) {
    filters.push({ keywords });
  }
  if (info_model) {
    filters.push({
      info_model
    });
  }
  if (referencesSource) {
    filters.push({
      'references.source.uri.keyword': referencesSource
    });
  }
  if (conformsTo) {
    filters.push({
      'conformsTo.uri.keyword': conformsTo
    });
  }
  if (format) {
    filters.push({
      collection: {
        field: 'distribution.mediaType.code.keyword',
        values: format.split(',')
      }
    });
  }
  if (relatedToInfoModel) {
    filters.push({ dataset_info_model_relations: relatedToInfoModel });
  }

  // Filter out NAP data if filterTransportDatasets in conf is true
  if (getConfig().filterTransportDatasets) {
    filters.push(
      { accessRights: 'PUBLIC' },
      {
        themeprofile: 'transport'
      }
    );
  }

  if (/^\d{9}$/.test(organizationNumber ?? '')) {
    filters.push({
      'publisher.id.keyword': organizationNumber
    });
  }

  return filters.length > 0 ? filters : undefined;
};

export const paramsToSearchBody = ({ q, page, size, ...params }: any) => ({
  q,
  page: page ? Number(page) : undefined,
  size,
  sorting: mapSorting(params),
  filters: mapFilters(params)
});

export const extractDatasets = (searchResponse: any) =>
  searchResponse?.hits ?? [];

export const extractDatasetAggregations = (searchResponse: any) =>
  normalizeAggregations(searchResponse).aggregations ?? [];

export const extractDatasetsTotal = (searchResponse: any) =>
  searchResponse?.page?.totalElements ?? 0;

export const extractFirstDataset = (searchResponse: any): Dataset | undefined =>
  searchResponse?.hits?.[0];

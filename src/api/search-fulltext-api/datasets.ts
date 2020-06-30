import { searchFullTextApiPost } from './host';
import { normalizeAggregations } from '../../lib/normalizeAggregations';
import { getConfig } from '../../config';

export const searchDatasets = (body: any) =>
  searchFullTextApiPost('/datasets', body);

const mapSorting = ({ sortfield }: any) =>
  sortfield === 'modified'
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
  subject
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

  // Filter out NAP data if filterTransportDatasets in conf is true
  if (getConfig().filterTransportDatasets) {
    filters.push(
      { accessRights: 'PUBLIC' },
      {
        themeprofile: 'transport'
      }
    );
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
  searchResponse?.page?.totalElements ?? 0;

export const extractFirstDataset = ({ hits = [] }: any) => hits[0] ?? {};

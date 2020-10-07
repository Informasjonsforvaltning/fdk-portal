import { organizationsApiGet } from './host';

export const getOrganizations = (filter?: string) =>
  organizationsApiGet(
    filter ? `/organizationcatalogs?filter=${filter}` : '/organizationcatalogs'
  );

export const getOrganization = (id: string) =>
  organizationsApiGet(`/organizationcatalogs/${id}`);

export const getOrganizationDatasets = (id: string, page: number = 0) =>
  organizationsApiGet(`/organizationcatalogs/${id}/datasets?page=${page}`);

export const getOrganizationDataset = (
  organizationId: string,
  datasetId: string
) =>
  organizationsApiGet(
    `/organizationcatalogs/${organizationId}/datasets/${datasetId}`
  );

export const extractOrganizations = ({ organizations = [] }: any) =>
  organizations;

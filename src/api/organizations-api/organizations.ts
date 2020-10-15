import { organizationsApiGet } from './host';

export const getOrganizations = (filter?: string) =>
  organizationsApiGet('/organizationcatalogs', { filter });

export const getOrganization = (id: string) =>
  organizationsApiGet(`/organizationcatalogs/${id}`);

export const getOrganizationDatasets = (
  id: string,
  page?: number,
  filter?: string
) =>
  organizationsApiGet(`/organizationcatalogs/${id}/datasets`, { page, filter });

export const getOrganizationDataset = (
  organizationId: string,
  datasetId: string
) =>
  organizationsApiGet(
    `/organizationcatalogs/${organizationId}/datasets/${datasetId}`
  );

export const extractOrganizations = ({ organizations = [] }: any) =>
  organizations;

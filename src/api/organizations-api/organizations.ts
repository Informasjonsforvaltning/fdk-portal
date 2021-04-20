import { organizationsApiGet } from './host';

export const getOrganizations = (filter?: string) =>
  organizationsApiGet('/organizationcatalogs', { filter });

export const getOrganization = (id: string) =>
  organizationsApiGet(`/organizationcatalogs/${id}`);

export const extractOrganizations = ({ organizations = [] }: any) =>
  organizations;

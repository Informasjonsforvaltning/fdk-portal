import { organizationsApiGet } from './host';

export const getOrganizations = (filter?: string, includeEmpty?: string) =>
  organizationsApiGet('/organizationcatalogs', { filter, includeEmpty });

export const getOrganization = (id: string, filter?: string) =>
  organizationsApiGet(`/organizationcatalogs/${id}`, { filter });

export const extractOrganizations = ({ organizations = [] }: any) =>
  organizations;

import { organizationsCatalogApiGet } from './host';
import { normalizeOrganizationsArray } from './normalize';

export const getOrganizations = () =>
  organizationsCatalogApiGet('/organizations');

export const getOrganization = (id: string) =>
  organizationsCatalogApiGet(`/organizations/${id}`);

export const extractOrganizations = (organizationsResponse: any = []) =>
  normalizeOrganizationsArray(organizationsResponse);

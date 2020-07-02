import { organizationsCatalogApiGet } from './host';
import { normalizeOrganizationsArray } from './normalize';

export const getOrganizations = () =>
  organizationsCatalogApiGet('/organizations');

export const extractOrganizations = (organizationsResponse: any = []) =>
  normalizeOrganizationsArray(organizationsResponse);

import { organizationsApiGet } from './host';

export const getOrganizations = () =>
  organizationsApiGet('/organizationcatalogs');

export const extractOrganizations = ({ organizations = [] }: any) =>
  organizations;

import { organizationsApiGet } from './host';

export const getOrganizationCategories = (
  type: 'municipality' | 'state',
  includeEmpty: boolean
) =>
  organizationsApiGet(`/organizationcategories/${type}`, {
    includeEmpty: includeEmpty.toString()
  });

export const extractOrganizationCategories = ({ categories = [] }: any) =>
  categories;

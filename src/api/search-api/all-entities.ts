import { searchApiPost, searchApiGet } from './host';

export const searchAllEntities = (body: any) => searchApiPost('', body);

export const getRecentEntities = () => searchApiGet('/recent');

export const extractEntities = (searchResponse: any) =>
  searchResponse?.hits ?? [];

import { searchFullTextApiPost, searchFullTextApiGet } from './host';

export const searchAllEntities = (body: any) =>
  searchFullTextApiPost('/search', body);

export const getRecentEntities = () => searchFullTextApiGet('/recent');

export const extractEntities = (searchResponse: any) =>
  searchResponse.hits ?? [];

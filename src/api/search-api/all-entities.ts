import { searchApiPost } from './host';

export const searchAllEntities = (body: any) => searchApiPost('search', body);

export const getRecentEntities = () =>
  searchApiPost('search', {
    pagination: { size: 5, page: 0 },
    sort: {
      field: 'FIRST_HARVESTED',
      direction: 'DESC'
    }
  });

export const extractEntities = (searchResponse: any) =>
  searchResponse?.hits ?? [];

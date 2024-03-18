import { searchApiPost } from './host';

export const searchAllEntities = (body: any) => searchApiPost('', body);

export const getRecentEntities = () =>
  searchApiPost('', {
    pagination: { size: 5, page: 0 },
    sort: {
      field: 'FIRST_HARVESTED',
      direction: 'DESC'
    }
  });

export const extractEntities = (searchResponse: any) =>
  searchResponse?.hits ?? [];

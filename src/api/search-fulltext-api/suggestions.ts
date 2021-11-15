import { searchFullTextApiGet } from './host';

export const getSearchSuggestions = (q: string, transport?: boolean) =>
  searchFullTextApiGet(
    '/suggestion',
    new URLSearchParams({
      q: encodeURI(q),
      ...(!!transport && { transport: 'true' })
    })
  );

export const extractSuggestions = (searchResponse: any) =>
  searchResponse?.suggestions ?? [];

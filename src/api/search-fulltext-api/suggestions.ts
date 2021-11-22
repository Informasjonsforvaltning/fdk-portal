import { SuggestionIndexEnum } from '../../types/enums';
import { searchFullTextApiGet } from './host';

export const getSearchSuggestions = (
  q: string,
  transport?: boolean,
  searchEntity?: string
) => {
  const searchPath =
    searchEntity != null && searchEntity in SuggestionIndexEnum
      ? `/suggestion${searchEntity}`
      : '/suggestion';
  return searchFullTextApiGet(
    searchPath,
    new URLSearchParams({
      q: encodeURI(q),
      ...(!!transport && { transport: 'true' })
    })
  );
};

export const extractSuggestions = (searchResponse: any) =>
  searchResponse?.suggestions ?? [];

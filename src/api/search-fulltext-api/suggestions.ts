import { SuggestionIndexEnum } from '../../types/enums';
import { searchFullTextApiGet } from './host';

export const getSearchSuggestions = (
  q: string,
  transport?: boolean,
  searchEntity?: string
) => {
  const searchPath =
    searchEntity != null && searchEntity in SuggestionIndexEnum
      ? `/suggestion${
          SuggestionIndexEnum[searchEntity as keyof typeof SuggestionIndexEnum]
        }`
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

import { SuggestionIndexEnum } from '../../types/enums';
import { searchApiGet } from './host';

export const getSearchSuggestions = (
  q: string,
  transport?: boolean,
  searchEntity?: string
) => {
  const searchPath =
    searchEntity != null && searchEntity in SuggestionIndexEnum
      ? `suggestions${
          SuggestionIndexEnum[searchEntity as keyof typeof SuggestionIndexEnum]
        }`
      : 'suggestions';
  return searchApiGet(
    searchPath,
    new URLSearchParams({
      q,
      ...(!!transport && { profile: 'TRANSPORT' })
    })
  );
};

export const extractSuggestions = (searchResponse: any) =>
  searchResponse?.suggestions ?? [];

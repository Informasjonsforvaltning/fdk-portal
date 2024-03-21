import { SuggestionIndexEnum } from '../../types/enums';
import { searchApiGet } from './host';

export const getSearchSuggestions = (
  q: string,
  transport?: boolean,
  searchEntity?: string
) => {
  console.log(searchEntity);
  const searchPath =
    searchEntity != null && searchEntity in SuggestionIndexEnum
      ? `suggestions${
          SuggestionIndexEnum[searchEntity as keyof typeof SuggestionIndexEnum]
        }`
      : 'suggestions';
  return searchApiGet(
    searchPath,
    new URLSearchParams({
      q: encodeURI(q),
      ...(!!transport && { transport: 'true' })
    })
  );
};

export const extractSuggestions = (searchResponse: any) =>
  searchResponse?.suggestions ?? [];

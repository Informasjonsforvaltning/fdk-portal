export const generateQueryKey = (query: any) => JSON.stringify(query);

export const shouldFetch = (searchQuery: any, previousSearchQuery: any) =>
  previousSearchQuery !== generateQueryKey(searchQuery);

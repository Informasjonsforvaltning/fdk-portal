import localization from './localization';
import { buildSearchUrl, parseSearchQuery, SearchSet } from './search-url';
import { Filter } from '../types/enums';

describe('buildSearchUrl', () => {
  beforeEach(() => localization.setLanguage('nb'));

  it('links to the all-catalogs search without a set', () => {
    expect(buildSearchUrl(SearchSet.ALL)).toBe('/nb/search');
  });

  it('uses the current language', () => {
    localization.setLanguage('en');
    expect(buildSearchUrl(SearchSet.CONCEPTS)).toBe('/en/search/concepts');
  });

  it('maps old filters to new search params', () => {
    const url = buildSearchUrl(SearchSet.DATASETS, {
      [Filter.ORGPATH]: '/STAT/972417858',
      [Filter.OPENDATA]: 'true',
      [Filter.ACCESSRIGHTS]: 'PUBLIC',
      [Filter.PROVENANCE]: 'NASJONAL',
      [Filter.FORMAT]: 'FILE_TYPE CSV',
      [Filter.LOS]: 'helse-og-omsorg/helse',
      [Filter.THEME]: 'ECON',
      [Filter.LASTXDAYS]: '7'
    });
    const { pathname, searchParams } = new URL(url, 'https://data.norge.no');

    expect(pathname).toBe('/nb/search/datasets');
    expect(Object.fromEntries(searchParams)).toEqual({
      orgPath: '/STAT/972417858',
      access: 'true,PUBLIC',
      provenance: 'NASJONAL',
      format: 'FILE_TYPE CSV',
      losTheme: 'helse-og-omsorg/helse',
      dataTheme: 'ECON',
      sort: 'firstHarvestedDesc'
    });
  });

  it('keeps the query from the current location', () => {
    const query = parseSearchQuery('?orgPath=%2FSTAT%2F972417858&page=2');
    expect(buildSearchUrl(SearchSet.CONCEPTS, query)).toBe(
      '/nb/search/concepts?orgPath=%2FSTAT%2F972417858'
    );
  });
});

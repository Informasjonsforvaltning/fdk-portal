import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';

import { searchAllEntities } from '../../api/search-api/all-entities';
import { parseSearchParams } from '../../lib/location-history-helper';
import { paramsToSearchBody } from '../../utils/common';

const memoizedSearchAllEntities = memoize(searchAllEntities);

const mapProps = {
  searchAllEntities: ({ location }: any) => {
    const {
      q,
      orgPath,
      losTheme,
      page = 0,
      sortfield,
      accessrights,
      opendata,
      theme
    } = parseSearchParams(location);

    const searchAllEntitiesSearchBody = paramsToSearchBody({
      q: `${q}`,
      page: Number(page),
      sort: {
        field: `${sortfield}`,
        direction: 'desc'
      },
      filters: {
        orgPath: `${orgPath}`,
        losTheme: `${losTheme}`,
        accessrights: `${accessrights}`,
        opendata: opendata === 'true',
        theme: `${theme}`
      }
    });

    return memoizedSearchAllEntities(searchAllEntitiesSearchBody);
  }
};

export const searchPageResolver = resolve(mapProps);

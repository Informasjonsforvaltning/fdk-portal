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
      q: q ? `${q}` : undefined,
      page: page ? Number(page) : undefined,
      sortfield: sortfield ? `${sortfield}` : undefined,
      orgPath: orgPath ? `${orgPath}` : undefined,
      losTheme: losTheme ? `${losTheme}` : undefined,
      accessrights: accessrights ? `${accessrights}` : undefined,
      opendata: opendata !== undefined ? opendata === 'true' : undefined,
      theme: theme ? `${theme}` : undefined
    });

    return memoizedSearchAllEntities(searchAllEntitiesSearchBody);
  }
};

export const searchPageResolver = resolve(mapProps);

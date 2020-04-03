import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';

import { searchAllEntities } from '../../api/search-fulltext-api/all-entities';
import { parseSearchParams } from '../../lib/location-history-helper';
import { PATHNAME_SEARCH } from '../../constants/constants';
import { normalizeAggregations } from '../../lib/normalizeAggregations';

const memoizedSearchAllEntities = memoize(searchAllEntities);

const mapProps = {
  searchAllEntities: ({ location }: any) => {
    const { q, orgPath, losTheme: los, page, sortfield } = parseSearchParams(
      location
    );

    const filters = [];
    orgPath && filters.push({ orgPath });
    los && filters.push({ los });

    const searchAllEntitiesParams =
      location.pathname === PATHNAME_SEARCH
        ? {
            q,
            ...(filters.length > 0 && { filters }),
            ...(page && { page: parseInt(page || 0, 10) }),
            ...(sortfield && {
              sorting: { field: sortfield, direction: 'desc' }
            })
          }
        : { q };

    return memoizedSearchAllEntities(searchAllEntitiesParams).then(response =>
      normalizeAggregations(response)
    );
  }
};

export const searchPageResolver = resolve(mapProps);

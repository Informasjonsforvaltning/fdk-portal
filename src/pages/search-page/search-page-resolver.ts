import memoize from 'lodash/memoize';
import pick from 'lodash/pick';
import { resolve } from 'react-resolver';

import { searchAllEntities } from '../../api/search-fulltext-api/all-entities';
import { parseSearchParams } from '../../lib/location-history-helper';
import { PATHNAME_SEARCH } from '../../constants/constants';
import { normalizeAggregations } from '../../lib/normalizeAggregations';

const memoizedSearchAllEntities = memoize(searchAllEntities);

const mapProps = {
  searchAllEntities: ({ location }: any) => {
    const searchParameters = parseSearchParams(location);
    const searchParamOnlyQ = pick(searchParameters, 'q');
    const searchAllEntitiesParams =
      location.pathname === PATHNAME_SEARCH
        ? searchParameters
        : searchParamOnlyQ;
    return memoizedSearchAllEntities(searchAllEntitiesParams).then(response =>
      normalizeAggregations(response)
    );
  }
};

export const searchPageResolver = resolve(mapProps);

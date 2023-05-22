import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ORGANIZATION_CATEGORIES_REQUESTED,
  GET_ORGANIZATION_CATEGORIES_SUCCEEDED,
  SORT_ORGANIZATION_CATEGORIES
} from './action-types';

import { sortOrganizationCategories } from './utils';

import type { Actions } from '../../../types';

const initialState = fromJS({
  organizationCategories: []
});

export default function reducer(
  // eslint-disable-next-line default-param-last
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action?.type) {
    case GET_ORGANIZATION_CATEGORIES_REQUESTED:
      return state.set('organizationCategories', fromJS([]));
    case GET_ORGANIZATION_CATEGORIES_SUCCEEDED:
      return state
        .set('organizationCategories', fromJS(action.payload.categories))
        .update(
          'organizationCategories',
          sortOrganizationCategories(['prefLabel'])
        );
    case SORT_ORGANIZATION_CATEGORIES:
      return state.update(
        'organizationCategories',
        sortOrganizationCategories(
          action.payload.selector,
          action.payload.order
        )
      );
    default:
      return state;
  }
}

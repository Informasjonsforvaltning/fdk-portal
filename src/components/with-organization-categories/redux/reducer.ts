import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ORGANIZATION_CATEGORIES_REQUESTED,
  GET_ORGANIZATION_CATEGORIES_SUCCEEDED
} from './action-types';

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
      return state.set(
        'organizationCategories',
        fromJS(action.payload.categories)
      );
    default:
      return state;
  }
}

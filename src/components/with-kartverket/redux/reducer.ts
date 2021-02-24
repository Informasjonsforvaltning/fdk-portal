import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  LIST_ADMINISTRATIVE_UNITS_REQUESTED,
  LIST_ADMINISTRATIVE_UNITS_SUCCEEDED,
  LIST_ADMINISTRATIVE_UNITS_FAILED,
  RESET_ADMINISTRATIVE_UNITS
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  administrativeUnits: [],
  isLoadingAdministrativeUnits: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case LIST_ADMINISTRATIVE_UNITS_REQUESTED:
      return state.set('isLoadingAdministrativeUnits', true);
    case LIST_ADMINISTRATIVE_UNITS_SUCCEEDED:
      return state
        .set('administrativeUnits', fromJS(action.payload.administrativeUnits))
        .set('isLoadingAdministrativeUnits', false);
    case LIST_ADMINISTRATIVE_UNITS_FAILED:
      return state.set('isLoadingAdministrativeUnits', false);
    case RESET_ADMINISTRATIVE_UNITS:
      return state.set('administrativeUnits', fromJS([]));
    default:
      return state;
  }
}

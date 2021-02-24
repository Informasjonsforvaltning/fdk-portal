import {
  LIST_ADMINISTRATIVE_UNITS_REQUESTED,
  LIST_ADMINISTRATIVE_UNITS_SUCCEEDED,
  LIST_ADMINISTRATIVE_UNITS_FAILED,
  RESET_ADMINISTRATIVE_UNITS
} from './actions-types';

import type { AdministrativeUnit } from '../../../types';

export function listAdministrativeUnitsRequested(uris: string[]) {
  return {
    type: LIST_ADMINISTRATIVE_UNITS_REQUESTED,
    payload: { uris }
  };
}

export function listAdministrativeUnitsSucceeded(
  administrativeUnits: AdministrativeUnit[]
) {
  return {
    type: LIST_ADMINISTRATIVE_UNITS_SUCCEEDED,
    payload: {
      administrativeUnits
    }
  };
}

export function listAdministrativeUnitsFailed(errors: Error | Error[]) {
  return {
    type: LIST_ADMINISTRATIVE_UNITS_FAILED,
    payload: Array.isArray(errors) ? errors : [errors],
    error: true
  };
}

export function resetAdministrativeUnits() {
  return {
    type: RESET_ADMINISTRATIVE_UNITS
  };
}

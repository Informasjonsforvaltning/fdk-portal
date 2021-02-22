import { all, call, put, takeLatest } from 'redux-saga/effects';

import { LIST_ADMINISTRATIVE_UNITS_REQUESTED } from './actions-types';
import * as actions from './actions';

import { getAdministrativeUnit } from './utils';

import type { AdministrativeUnit } from '../../../types';

function* listAdministrativeUnitsRequested({
  payload: { uris }
}: ReturnType<typeof actions.listAdministrativeUnitsRequested>) {
  try {
    const administrativeUnits: AdministrativeUnit[] = yield all(
      uris.map(uri =>
        call(getAdministrativeUnit, uri.replace('http://', 'https://'))
      )
    );

    if (Array.isArray(administrativeUnits)) {
      yield put(actions.listAdministrativeUnitsSucceeded(administrativeUnits));
    } else {
      yield put(
        actions.listAdministrativeUnitsFailed(
          new Error(
            'An error occurred during an attempt to contact Kartverket API'
          )
        )
      );
    }
  } catch (error) {
    yield put(actions.listAdministrativeUnitsFailed(error));
  }
}

export default function* saga() {
  yield all([
    takeLatest(
      LIST_ADMINISTRATIVE_UNITS_REQUESTED,
      listAdministrativeUnitsRequested
    )
  ]);
}

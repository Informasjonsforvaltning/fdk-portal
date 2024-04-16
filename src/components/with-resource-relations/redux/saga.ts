import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_RESOURCE_RELATIONS_REQUESTED } from './action-types';
import * as actions from './actions';

import type { SearchObject } from '../../../types';
import { paramsToSearchBody } from '../../../utils/common';
import {
  extractEntities,
  searchAllEntities
} from '../../../api/search-api/all-entities';

function* getResourceRelationsRequested({
  payload: {
    params: { size, relations }
  }
}: ReturnType<typeof actions.getResourceRelationsRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchAllEntities,
      paramsToSearchBody({ size, relations })
    );

    if (data) {
      yield put(
        actions.getResourceRelationsSucceeded(
          extractEntities(data) as SearchObject[]
        )
      );
    } else {
      yield put(actions.getResourceRelationsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getResourceRelationsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_RESOURCE_RELATIONS_REQUESTED, getResourceRelationsRequested)
  ]);
}

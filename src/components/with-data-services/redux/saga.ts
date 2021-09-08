import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_DATA_SERVICES_REQUESTED,
  GET_DATA_SERVICES_RELATIONS_REQUESTED
} from './action-types';
import * as actions from './actions';

import {
  searchDataServices,
  paramsToSearchBody
} from '../../../api/search-fulltext-api/dataservices';

import type { DataService } from '../../../types';

function* getDataServicesRequested({
  payload: {
    params: { dataseturi, size, endpointDescription, servesDataset, uris }
  }
}: ReturnType<typeof actions.getDataServicesRequested>) {
  if (!dataseturi && !endpointDescription && !uris) {
    return;
  }

  try {
    const body = paramsToSearchBody({
      dataseturi,
      size,
      endpointDescription,
      servesDataset,
      uris
    });
    const data: Record<string, any> = yield call(searchDataServices, body);
    if (data?.hits) {
      yield put(actions.getDataServicesSucceeded(data?.hits as DataService[]));
    } else {
      yield put(actions.getDataServicesFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getDataServicesFailed(e.message));
  }
}

function* getDataServicesRelationsRequested({
  payload: {
    params: { dataseturi, size, endpointDescription, servesDataset, uris }
  }
}: ReturnType<typeof actions.getDataServicesRelationsRequested>) {
  if (!dataseturi && !endpointDescription && !uris) {
    return;
  }

  try {
    const body = paramsToSearchBody({
      dataseturi,
      size,
      endpointDescription,
      servesDataset,
      uris
    });
    const data: Record<string, any> = yield call(searchDataServices, body);
    if (data?.hits) {
      yield put(
        actions.getDataServicesRelationsSucceeded(data?.hits as DataService[])
      );
    } else {
      yield put(actions.getDataServicesRelationsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getDataServicesRelationsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATA_SERVICES_REQUESTED, getDataServicesRequested),
    takeLatest(
      GET_DATA_SERVICES_RELATIONS_REQUESTED,
      getDataServicesRelationsRequested
    )
  ]);
}

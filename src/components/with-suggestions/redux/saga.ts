import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_SEARCH_SUGGESTIONS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractSuggestions,
  getSearchSuggestions
} from '../../../api/search-fulltext-api/suggestions';

import type { SearchSuggestion } from '../../../types';

function* getSearchSuggestionsRequested({
  payload: { query, isNap, searchEntity }
}: ReturnType<typeof actions.getSearchSuggestionsRequested>) {
  try {
    const data: SearchSuggestion[] = yield call(
      getSearchSuggestions,
      query,
      isNap,
      searchEntity
    );

    if (data) {
      yield put(
        actions.getSearchSuggestionsSucceeded(
          extractSuggestions(data) as SearchSuggestion[],
          query
        )
      );
    } else {
      yield put(actions.getSearchSuggestionsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getSearchSuggestionsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_SEARCH_SUGGESTIONS_REQUESTED, getSearchSuggestionsRequested)
  ]);
}

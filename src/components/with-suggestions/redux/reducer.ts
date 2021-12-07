import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_SEARCH_SUGGESTIONS_REQUESTED,
  GET_SEARCH_SUGGESTIONS_SUCCEEDED,
  GET_SEARCH_SUGGESTIONS_FAILED,
  RESET_SEARCH_SUGGESTIONS
} from './action-types';

import type { Actions, SearchSuggestion } from '../../../types';

const initialState = fromJS({
  isLoadingSuggestions: false,
  cachedSuggestions: {} as Record<string, SearchSuggestion[]>
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_SEARCH_SUGGESTIONS_REQUESTED:
      return state.set('isLoadingSuggestions', true);
    case GET_SEARCH_SUGGESTIONS_SUCCEEDED:
      return state
        .set(
          'cachedSuggestions',
          fromJS({
            ...state.get('cachedSuggestions').toJS(),
            [action.payload.query]: action.payload.suggestions
          })
        )
        .set('isLoadingSuggestions', false);
    case GET_SEARCH_SUGGESTIONS_FAILED:
      return state.set('isLoadingSuggestions', false);
    case RESET_SEARCH_SUGGESTIONS:
      return state
        .set('isLoadingSuggestions', false)
        .set('cachedSuggestions', fromJS({}));
    default:
      return state;
  }
}

import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_CMS_ARTICLE_REQUESTED,
  GET_CMS_ARTICLE_SUCCEEDED,
  GET_CMS_ARTICLE_FAILED
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  article: null
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_CMS_ARTICLE_REQUESTED:
      return state.set('article', null);
    case GET_CMS_ARTICLE_SUCCEEDED:
      return state.set('article', fromJS(action.payload.article));
    case GET_CMS_ARTICLE_FAILED:
      return state;
    default:
      return state;
  }
}

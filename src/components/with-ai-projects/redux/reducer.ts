import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_AI_PROJECTS_FAILED,
  GET_AI_PROJECTS_REQUESTED,
  GET_AI_PROJECTS_SUCCEEDED
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  aiProjects: []
});

export default function reducer(state: any, action: Actions<typeof actions>) {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case GET_AI_PROJECTS_REQUESTED:
      return state.setIn(['aiProjects'], undefined);
    case GET_AI_PROJECTS_SUCCEEDED: {
      const { data } = action.payload;
      return state.setIn(['aiProjects'], fromJS(data));
    }
    case GET_AI_PROJECTS_FAILED:
      return state.setIn(['aiProjects'], undefined);
    default:
      return state;
  }
}

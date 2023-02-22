import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_AI_PROJECTS_FAILED,
  GET_AI_PROJECTS_REQUESTED,
  GET_AI_PROJECTS_SUCCEEDED
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  aiProjects: [],
  aiProjectsIsLoading: true
});

export default function reducer(state: any, action: Actions<typeof actions>) {
  state = state ?? initialState;
  switch (action.type) {
    case GET_AI_PROJECTS_REQUESTED:
      return state
        .set('aiProjects', undefined)
        .set('aiProjectsIsLoading', true);
    case GET_AI_PROJECTS_SUCCEEDED: {
      const { data } = action.payload;
      return state
        .set('aiProjects', fromJS(data))
        .set('aiProjectsIsLoading', false);
    }
    case GET_AI_PROJECTS_FAILED:
      return state
        .set('aiProjects', undefined)
        .set('aiProjectsIsLoading', false);
    default:
      return state;
  }
}

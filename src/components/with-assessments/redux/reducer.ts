import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ASSESSMENTS_REQUESTED,
  GET_ASSESSMENTS_SUCCEEDED,
  LOAD_MORE_ASSESSMENTS_REQUESTED,
  LOAD_MORE_ASSESSMENTS_SUCCEEDED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  assessments: [],
  totalAssessments: 0,
  assessmentPageSize: 0,
  assessmentsPage: 0,
  hasMoreAssessments: false
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_ASSESSMENTS_REQUESTED:
      return state
        .set('assessments', fromJS([]))
        .set('totalAssessments', 0)
        .set('assessmentPageSize', 0)
        .set('assessmentsPage', 0)
        .set('hasMoreAssessments', false);
    case GET_ASSESSMENTS_SUCCEEDED:
      return state
        .set('assessments', fromJS(action.payload.content))
        .set('totalAssessments', action.payload.totalElements)
        .set('assessmentPageSize', action.payload.size)
        .set('assessmentsPage', action.payload.number)
        .set(
          'hasMoreAssessments',
          action.payload.number + 1 < action.payload.totalPages
        );
    case LOAD_MORE_ASSESSMENTS_REQUESTED:
      return state;
    case LOAD_MORE_ASSESSMENTS_SUCCEEDED:
      return state
        .update('assessments', (assessments: any) =>
          assessments.concat(fromJS(action.payload.content))
        )
        .set('totalAssessments', action.payload.totalElements)
        .set('assessmentPageSize', action.payload.size)
        .set('assessmentsPage', action.payload.number)
        .set(
          'hasMoreAssessments',
          action.payload.number + 1 < action.payload.totalPages
        );
    default:
      return state;
  }
}

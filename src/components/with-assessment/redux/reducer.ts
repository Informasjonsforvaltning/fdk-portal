import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ASSESSMENT_REQUESTED,
  GET_ASSESSMENT_SUCCEEDED,
  GET_ASSESSMENTS_REQUESTED,
  GET_ASSESSMENTS_SUCCEEDED,
  GET_CATALOG_RATING_REQUESTED,
  GET_CATALOG_RATING_SUCCEEDED,
  LOAD_MORE_ASSESSMENTS_REQUESTED,
  LOAD_MORE_ASSESSMENTS_SUCCEEDED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  assessment: null,
  assessments: [],
  catalogRating: null,
  totalAssessments: 0,
  assessmentPageSize: 0,
  assessmentsPage: 0,
  hasMoreAssessments: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_ASSESSMENT_REQUESTED:
      return state.set('assessment', null);
    case GET_ASSESSMENT_SUCCEEDED:
      return state.set('assessment', fromJS(action.payload.assessment));
    case GET_ASSESSMENTS_REQUESTED:
      return state
        .set('assessments', fromJS([]))
        .set('totalAssessments', 0)
        .set('assessmentPageSize', 0)
        .set('assessmentsPage', 0)
        .set('hasMoreAssessments', false);
    case GET_ASSESSMENTS_SUCCEEDED:
      return state
        .set('assessments', fromJS(action.payload.assessments))
        .set('totalAssessments', action.payload.totalAssessments)
        .set('assessmentPageSize', action.payload.assessmentPageSize)
        .set('assessmentsPage', action.payload.assessmentsPage)
        .set('hasMoreAssessments', action.payload.hasMoreAssessments);
    case GET_CATALOG_RATING_REQUESTED:
      return state.set('catalogRating', null);
    case GET_CATALOG_RATING_SUCCEEDED:
      return state.set('catalogRating', fromJS(action.payload));
    case LOAD_MORE_ASSESSMENTS_REQUESTED:
      return state;
    case LOAD_MORE_ASSESSMENTS_SUCCEEDED:
      return state
        .update('assessments', (assessments: any) =>
          assessments.concat(fromJS(action.payload.assessments))
        )
        .set('totalAssessments', action.payload.totalAssessments)
        .set('assessmentPageSize', action.payload.assessmentPageSize)
        .set('assessmentsPage', action.payload.assessmentsPage)
        .set('hasMoreAssessments', action.payload.hasMoreAssessments);
    default:
      return state;
  }
}

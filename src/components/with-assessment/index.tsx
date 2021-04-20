import React, { ComponentType, memo, FC } from 'react';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { Assessment, Rating } from '../../types';

export interface Props {
  assessment: Assessment | null;
  assessments: Assessment[] | [];
  catalogRating: Rating | null;
  totalAssessments: number | 0;
  assessmentsPage: number | 0;
  assessmentPageSize: number | 0;
  hasMoreAssessments: boolean | false;
  assessmentActions: typeof actions;
}
const withAssessment = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    assessment: state.AssessmentReducer.get('assessment')?.toJS() ?? null,
    assessments: state.AssessmentReducer.get('assessments').toJS(),
    catalogRating: state.AssessmentReducer.get('catalogRating')?.toJS() ?? null,
    totalAssessments: state.AssessmentReducer.get('totalAssessments'),
    assessmentsPage: state.AssessmentReducer.get('assessmentsPage'),
    assessmentPageSize: state.AssessmentReducer.get('assessmentPageSize'),
    hasMoreAssessments: state.AssessmentReducer.get('hasMoreAssessments')
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    assessmentActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withAssessment;

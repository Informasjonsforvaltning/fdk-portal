import React, { ComponentType, memo, FC } from 'react';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { Assessment } from '../../types';

export interface Props {
  assessments: Assessment[];
  totalAssessments: number;
  assessmentsPage: number;
  assessmentPageSize: number;
  hasMoreAssessments: boolean;
  assessmentsActions: typeof actions;
}
const withAssessments = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    assessments: state.AssessmentsReducer.get('assessments')?.toJS() ?? [],
    totalAssessments: state.AssessmentsReducer.get('totalAssessments'),
    assessmentsPage: state.AssessmentsReducer.get('assessmentsPage'),
    assessmentPageSize: state.AssessmentsReducer.get('assessmentPageSize'),
    hasMoreAssessments: state.AssessmentsReducer.get('hasMoreAssessments')
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    assessmentsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withAssessments;

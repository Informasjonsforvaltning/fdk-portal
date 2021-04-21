import React, { ComponentType, memo, FC } from 'react';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { Assessment, Rating } from '../../types';

export interface Props {
  assessment: Assessment | null;
  catalogRating: Rating | null;
  assessmentActions: typeof actions;
}
const withAssessment = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    assessment: state.AssessmentReducer.get('assessment')?.toJS() ?? null,
    catalogRating: state.AssessmentReducer.get('catalogRating')?.toJS() ?? null
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

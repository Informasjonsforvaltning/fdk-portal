import React, { ComponentType, memo, FC } from 'react';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { DatasetScores } from '../../types';

export interface Props {
  datasetScores: DatasetScores | null;
  datasetScoresActions: typeof actions;
}
const withDatasetScores = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    datasetScores:
      state.DatasetScoresReducer.get('datasetScores')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    datasetScoresActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withDatasetScores;

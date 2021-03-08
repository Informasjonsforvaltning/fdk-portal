import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { Dataset } from '../../types';

export interface Props {
  dataset: Dataset | null;
  datasetActions: typeof actions;
  isLoadingDataset: boolean;
}

const withDataset = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    dataset: state.DatasetReducer.get('dataset')?.toJS() ?? null,
    isLoadingDataset: state.DatasetReducer.get('isLoadingDataset')
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    datasetActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withDataset;

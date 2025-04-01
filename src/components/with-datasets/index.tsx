import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import type { Dataset } from '../../types';

export interface Props {
  datasets: Dataset[];
  datasetsActions: typeof actions;
  isLoadingDatasets: boolean;
}

const withDatasets = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    datasets: state.DatasetsReducer.get('datasets').toJS(),
    isLoadingDatasets: state.DatasetsReducer.get('isLoadingDatasets')
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    datasetsActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withDatasets;

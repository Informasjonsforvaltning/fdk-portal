import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { Dataset } from '../../types';

export interface Props {
  datasets: Dataset[];
  datasetsActions: typeof actions;
}

const withDatasets = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any, { datasetId }: any) => {
    return {
      datasets: state.DatasetsReducer.get(datasetId)?.toJS() ?? []
    };
  };

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    datasetsActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withDatasets;

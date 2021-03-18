import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import { DataService } from '../../types';

export interface Props {
  dataService: DataService | null;
  dataServiceActions: typeof actions;
  isLoadingDataService: boolean;
}

const withDataService = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    dataService: state.DataServiceReducer.get('dataService')?.toJS() ?? null,
    isLoadingDataService: state.DataServiceReducer.get('isLoadingDataService')
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    dataServiceActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withDataService;

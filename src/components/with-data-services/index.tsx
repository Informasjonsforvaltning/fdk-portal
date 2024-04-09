import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { DataService } from '../../types';

export interface Props {
  dataServices: DataService[];
  dataServicesActions: typeof actions;
}

const withDataServices = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    dataServices: state.DataServicesReducer.get('dataServices').toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    dataServicesActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withDataServices;

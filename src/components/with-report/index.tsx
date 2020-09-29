import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { DatasetsReport } from '../../types';

export interface Props {
  datasetsReport: DatasetsReport | null;
  reportActions: typeof actions;
}

const withReport = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    datasetsReport: state.ReportReducer.get('datasetsReport')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    reportActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withReport;

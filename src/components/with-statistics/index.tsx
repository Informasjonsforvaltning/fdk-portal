import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import type { Statistics } from '../../types';

export interface Props {
  statistics: Partial<Statistics>;
  statisticsActions: typeof actions;
}

const withStatistics = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    statistics: state.StatisticsReducer.get('statistics')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    statisticsActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withStatistics;

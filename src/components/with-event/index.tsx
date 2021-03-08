import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';
import type { Event } from '../../types';

export interface Props {
  event: Event | null;
  eventActions: typeof actions;
  isLoadingEvent: boolean;
}

const withEvent = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    event: state.EventReducer.get('event')?.toJS() ?? null,
    isLoadingEvent: state.EventReducer.get('isLoadingEvent')
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    eventActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withEvent;

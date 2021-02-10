import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';
import type { Event } from '../../types';

export interface Props {
  events: Event[];
  eventsActions: typeof actions;
}

const withEvents = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    events: state.EventsReducer.get('events')?.toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    eventsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withEvents;

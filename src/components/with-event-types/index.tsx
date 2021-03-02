import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';
import type { EventType } from '../../types';

export interface Props {
  eventTypes: EventType[];
  eventTypesActions: typeof actions;
}

const withEventTypes = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    eventTypes: state.EventTypesReducer.get('eventTypes')?.toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    eventTypesActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withEventTypes;

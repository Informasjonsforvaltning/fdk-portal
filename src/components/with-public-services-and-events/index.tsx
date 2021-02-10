import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';
import type { ESPage, PublicService, Event } from '../../types';

export interface Props {
  publicServicesAndEvents: (PublicService | Event)[];
  publicServicesAndEventsAggregations: any;
  publicServicesAndEventsPage: ESPage;
  publicServicesAndEventsActions: typeof actions;
}

const withPublicServicesAndEvents = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    publicServicesAndEvents: state.PublicServicesAndEventsReducer.get(
      'publicServicesAndEvents'
    )?.toJS(),
    publicServicesAndEventsAggregations:
      state.PublicServicesAndEventsReducer.get(
        'publicServicesAndEventsAggregations'
      )?.toJS() ?? null,
    publicServicesAndEventsPage:
      state.PublicServicesAndEventsReducer.get(
        'publicServicesAndEventsPage'
      )?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    publicServicesAndEventsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withPublicServicesAndEvents;

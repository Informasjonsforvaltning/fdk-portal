import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';
import type { ESPage, PublicService } from '../../types';

export interface Props {
  publicServices: PublicService[];
  publicServicesAggregations: any;
  publicServicesPage: ESPage;
  publicServicesActions: typeof actions;
  publicServicesRelations: PublicService[];
}

const withPublicServices = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    publicServices: state.PublicServicesReducer.get('publicServices')?.toJS(),
    publicServicesAggregations:
      state.PublicServicesReducer.get('publicServicesAggregations')?.toJS() ??
      null,
    publicServicesPage:
      state.PublicServicesReducer.get('publicServicesPage')?.toJS() ?? null,
    publicServicesRelations: state.PublicServicesReducer.get(
      'publicServicesRelations'
    )?.toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    publicServicesActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withPublicServices;

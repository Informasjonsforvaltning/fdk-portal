import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';
import type { PublicService } from '../../types';

export interface Props {
  publicService: PublicService | null;
  publicServiceActions: typeof actions;
  isLoadingPublicService: boolean;
}

const withPublicService = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    publicService:
      state.PublicServiceReducer.get('publicService')?.toJS() ?? null,
    isLoadingPublicService: state.PublicServiceReducer.get(
      'isLoadingPublicService'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    publicServiceActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withPublicService;

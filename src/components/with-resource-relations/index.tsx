import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';
import type { SearchObject } from '../../types';

export interface ResourceRelationsProps {
  relations: SearchObject[];
  resourceRelationsActions: typeof actions;
}

const withResourceRelations = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: ResourceRelationsProps) => (
    <Component {...props} />
  );

  const mapStateToProps = (state: any) => ({
    relations: state.ResourceRelationsReducer.get('relations')?.toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    resourceRelationsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withResourceRelations;

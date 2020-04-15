import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

export interface Props {
  entities: any;
  entitiesActions: typeof actions;
}

const withEntities = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    entities: state.EntitiesReducer.get('entities').toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    entitiesActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withEntities;

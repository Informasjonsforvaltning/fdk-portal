import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { type AiProject } from '../../types';

export interface Props {
  aiProjects: AiProject[];
  aiProjectActions: typeof actions;
}

const withAiProjects = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: any) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    aiProjects: state.AiProjectsReducer.get('aiProjects').toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    aiProjectActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withAiProjects;

import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { CommunityPost, CommunityTopic } from '../../types';

export interface Props {
  topics: CommunityTopic[];
  multiplePages: boolean;
  posts: CommunityPost[];
  communityActions: typeof actions;
}

const withCommunity = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    topics: state.CommunityReducer.get('topics').toJS(),
    multiplePages: state.CommunityReducer.get('multiplePages'),
    posts: state.CommunityReducer.get('posts').toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    communityActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withCommunity;

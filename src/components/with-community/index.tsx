import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { CommunityPost, CommunityTopic, Pagination } from '../../types';

export interface Props {
  topics: CommunityTopic[];
  multiplePages: boolean;
  posts: CommunityPost[];
  communityActions: typeof actions;
  requests: CommunityTopic[];
  pagination: Pagination;
}

const withCommunity = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    topics: state.CommunityReducer.get('topics').toJS(),
    multiplePages: state.CommunityReducer.get('multiplePages'),
    posts: state.CommunityReducer.get('posts').toJS(),
    requests: state.CommunityReducer.get('requests').toJS(),
    pagination: state.CommunityReducer.get('pagination').toJS()
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

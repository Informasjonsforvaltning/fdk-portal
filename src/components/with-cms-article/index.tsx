import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { News } from '../../types';

export interface Props {
  cmsArticle: News | null;
  cmsArticleActions: typeof actions;
}

const withNewsArticle = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    cmsArticle: state.CmsArticleReducer.get('article')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    cmsArticleActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withNewsArticle;

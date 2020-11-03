import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import { Concept } from '../../types';

export interface Props {
  concept: Concept | null;
  conceptActions: typeof actions;
}

const withConcept = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    concept: state.ConceptReducer.get('concept')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    conceptActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withConcept;

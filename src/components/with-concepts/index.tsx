import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { Concept } from '../../types';

export interface Props {
  concepts: Concept[];
  conceptsRelations: Concept[];
  conceptsActions: typeof actions;
}

const withConcepts = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    concepts: state.ConceptsReducer.get('concepts').toJS(),
    conceptsRelations: state.ConceptsReducer.get('conceptsRelations').toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    conceptsActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withConcepts;

import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import { ReferenceData } from '../../types';

export interface Props {
  referenceData: ReferenceData;
  referenceDataActions: typeof actions;
}

const withReferenceData = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: any) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    referenceData: state.ReferenceDataReducer.get('referenceData').toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    referenceDataActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withReferenceData;

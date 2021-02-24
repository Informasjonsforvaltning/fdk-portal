import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { InformationModel } from '../../types';

export interface Props {
  informationModels: InformationModel[];
  informationModelsRelations: InformationModel[];
  informationModelsActions: typeof actions;
}

const withInformationModels = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    informationModels: state.InformationModelsReducer.get(
      'informationModels'
    ).toJS(),
    informationModelsRelations: state.InformationModelsReducer.get(
      'informationModelsRelations'
    ).toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    informationModelsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withInformationModels;

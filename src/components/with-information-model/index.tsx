import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { InformationModel } from '../../types';
import { DataFormat } from '../../types/enums';

export interface Props {
  informationModel: InformationModel | null;
  informationModelRdfRepresentations: Partial<{ [key in DataFormat]: string }>;
  isLoadingInformationModel: boolean;
  isLoadingInformationModelRdfRepresentations: boolean;
  informationModelActions: typeof actions;
}

const withInformationModel = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    informationModel:
      state.InformationModelReducer.get('informationModel')?.toJS() ?? null,
    informationModelRdfRepresentations: state.InformationModelReducer.get(
      'informationModelRdfRepresentations'
    ).toJS(),
    isLoadingInformationModel: state.InformationModelReducer.get(
      'isLoadingInformationModel'
    ),
    isLoadingInformationModelRdfRepresentations: state.InformationModelReducer.get(
      'isLoadingInformationModelRdfRepresentations'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    informationModelActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withInformationModel;

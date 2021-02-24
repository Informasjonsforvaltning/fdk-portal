import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { AdministrativeUnit } from '../../types';

export interface Props {
  administrativeUnits: AdministrativeUnit[];
  isLoadingAdministrativeUnits: boolean;
  kartverketActions: typeof actions;
}

const withKartverket = (Component: ComponentType<any>) => {
  const WrappedComponent: FC<Props> = props => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    administrativeUnits: state.KartverketReducer.get(
      'administrativeUnits'
    ).toJS(),
    isLoadingAdministrativeUnits: state.KartverketReducer.get(
      'isLoadingAdministrativeUnits'
    )
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    kartverketActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withKartverket;

import React, { ComponentType, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import * as actions from './redux/actions';

import type {
  Publisher,
  OrganizationCountsAndRating,
  EnhetsregisteretOrganization
} from '../../types';

export interface Props {
  organization: Publisher | null;
  isLoadingOrganization: boolean;
  enhetsregisteretOrganization: EnhetsregisteretOrganization | null;
  rating: OrganizationCountsAndRating | null;
  organizationActions: typeof actions;
}

const withOrganization = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    organization: state.OrganizationReducer.get('organization')?.toJS() ?? null,
    isLoadingOrganization: state.OrganizationReducer.get(
      'isLoadingOrganization'
    ),
    enhetsregisteretOrganization:
      state.OrganizationReducer.get('enhetsregisteretOrganization')?.toJS() ??
      null,
    rating: state.OrganizationReducer.get('rating')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    organizationActions: bindActionCreators(actions, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(memo(WrappedComponent));
};

export default withOrganization;

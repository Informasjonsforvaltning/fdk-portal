import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { OrganizationCategory } from '../../types';

export interface Props {
  organizationCategories: OrganizationCategory[];
  organizationCategoriesActions: typeof actions;
}

const withOrganizationCategories = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    organizationCategories: state.OrganizationCategoriesReducer.get(
      'organizationCategories'
    ).toJS()
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    organizationCategoriesActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    connect(mapStateToProps, mapDispatchToProps),
    memo
  )(WrappedComponent);
};

export default withOrganizationCategories;

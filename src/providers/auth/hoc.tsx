import React, { ComponentType } from 'react';

import service from '../../services/auth';

import Context from './context';

export type ServiceProps = { authService: typeof service };
type AuthProps<P> = P & ServiceProps;

export const withAuth =
  <P extends AuthProps<any>, C extends ComponentType<P>>(
    Child: C
  ): ComponentType<Omit<P, keyof ServiceProps>> =>
  (props: any) =>
    (
      <Context.Consumer>
        {({ service: authService }) => (
          <Child {...props} authService={authService} />
        )}
      </Context.Consumer>
    );

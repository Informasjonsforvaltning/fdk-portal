import React, { ComponentType } from 'react';

import service from '../../services/logging';

import Context from './context';

export type ServiceProps = { loggingService: typeof service };

type LoggingProps<P> = P & ServiceProps;

export const withLogging =
  <P extends LoggingProps<Record<string, any>>, C extends ComponentType<P>>(
    Child: C
  ): ComponentType<Omit<P, keyof ServiceProps>> =>
  (props: any) =>
    (
      <Context.Consumer>
        {({ service: loggingService }) => (
          <Child {...props} loggingService={loggingService} />
        )}
      </Context.Consumer>
    );

import React, { ComponentType } from 'react';

import service from '../../services/translations';

import Context from './context';

export type ServiceProps = { translationsService: typeof service };
type TranslationsProps<P> = P & ServiceProps;

export const withTranslations = <
  P extends TranslationsProps<any>,
  C extends ComponentType<P>
>(
  Child: C
): ComponentType<Omit<P, keyof ServiceProps>> => (props: any) => (
  <Context.Consumer>
    {({ service: translationsService }) => (
      <Child {...props} translationsService={translationsService} />
    )}
  </Context.Consumer>
);

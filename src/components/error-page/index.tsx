import React, { FC } from 'react';

import Error400 from './components/error-400';
import Error500 from './components/error-500';

import SC from './styled';

interface Props {
  errorCode?: string;
}

const errorMessage = (errorCode?: string) => {
  switch (errorCode) {
    case '404':
      return <Error400 />;
    case '500':
    default:
      return <Error500 />;
  }
};

const ErrorPage: FC<Props> = ({ errorCode }) => (
  <SC.ErrorPage>
    {errorMessage(errorCode)}
    <SC.UpperRightBackground />
    <SC.LowerLeftBackground />
  </SC.ErrorPage>
);

export default ErrorPage;

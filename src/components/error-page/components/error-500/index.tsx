import React, { FC } from 'react';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import Error500Icon from '../../../../images/illustration-500.svg';

import SC from './styled';

const Error500: FC = () => (
  <SC.Error500>
    <Error500Icon />
    <h1>{translate(translations.errorPage.serverError.title)}</h1>
    <p>{translate(translations.errorPage.serverError.content)}</p>
  </SC.Error500>
);

export default Error500;

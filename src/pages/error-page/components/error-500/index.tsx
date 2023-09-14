import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import Error500Icon from '../../../../images/illustration-500.svg';

import SC from './styled';

const Error500: FC = () => {
  const history = useHistory();

  return (
    <SC.Error500>
      <Error500Icon />
      <h1>{translate(translations.errorPage.serverError.title)}</h1>
      <span>
        <p>{translate(translations.errorPage.serverError.content)}</p>
        <p>{translate(translations.errorPage.serverError.content2)}</p>
        <SC.Link onClick={history.goBack}>
          {translate(translations.errorPage.serverError.backLink)}
        </SC.Link>
        <p>
          {parse(
            sanitizeHtml(
              translate(translations.errorPage.serverError.content3) ?? ''
            )
          )}
        </p>
      </span>
    </SC.Error500>
  );
};

export default Error500;

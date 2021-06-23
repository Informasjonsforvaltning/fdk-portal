import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import Error404Icon from '../../../../images/illustration-404.svg';

import SC from './styled';

const Error400: FC = () => {
  const history = useHistory();

  return (
    <SC.Error400>
      <Error404Icon />
      <h1>{translate(translations.errorPage.clientError.title)}</h1>
      <p>{translate(translations.errorPage.clientError.content1)}</p>
      <span>
        <p>{translate(translations.errorPage.clientError.content2)}</p>
        <SC.Link onClick={history.goBack}>
          {translate(translations.errorPage.clientError.backLink)}
        </SC.Link>
        {parse(
          sanitizeHtml(translate(translations.errorPage.clientError.content3))
        )}
      </span>
    </SC.Error400>
  );
};

export default Error400;

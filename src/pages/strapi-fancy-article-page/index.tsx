import React, { FC, memo } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { CircularProgress } from '@mui/material';
import env from '../../env';
import localization from '../../lib/localization';

import { useGetFancyArticleQuery } from '../../api/generated/cms/graphql';

import { PATHNAME_ACCESSIBILITY } from '../../constants/constants';

import ErrorPage from '../../components/error-page';

import { isBasicImage, isBasicParagraph } from '../../lib/strapi';
import Markdown from '../../components/markdown';
import { themeFDK } from '../../app/theme';

import SC from './styled';

interface Props extends RouteComponentProps {}

const { FDK_CMS_BASE_URI } = env;

const articleIds: { [pathname: string]: string } = {
  [PATHNAME_ACCESSIBILITY]: '10'
};

const FancyInformationPage: FC<Props> = () => {
  Object.entries(articleIds).map((id, i) =>
    i !== 0
      ? useGetFancyArticleQuery({
          variables: { id: articleIds[id[0]] }
        })
      : ''
  );

  const { data, loading, error } = useGetFancyArticleQuery({
    variables: {
      id: articleIds[location.pathname]
    }
  });

  const page = () => {
    if (loading) {
      return (
        <SC.Backdrop open>
          <CircularProgress color='inherit' />
        </SC.Backdrop>
      );
    }

    if (error?.name !== undefined || !data || !data.fancyArticle) {
      return <ErrorPage errorCode='404' />;
    }

    const {
      fancyArticle: { data: fancyArticleEntity }
    } = data;

    const fancyArticle = fancyArticleEntity?.attributes;

    return (
      fancyArticle && (
        <SC.Article>
          <SC.Title>{fancyArticle.title}</SC.Title>
          <SC.Description>{fancyArticle.subtitle}</SC.Description>
          {fancyArticle.Content?.map(
            component =>
              (isBasicParagraph(component) && (
                <SC.Content>
                  <Markdown allowHtml>{component?.Content ?? ''}</Markdown>
                </SC.Content>
              )) ||
              (isBasicImage(component) && (
                <SC.ImageWrapper key={component?.id}>
                  <SC.Image
                    alt={`${component?.media?.data?.attributes?.alternativeText}`}
                    src={`${FDK_CMS_BASE_URI}${component?.media?.data?.attributes?.url}`}
                  />
                  {component?.media?.data?.attributes?.caption && (
                    <SC.ImageText>
                      {localization.informationPage.imageText}
                      {component?.media?.data?.attributes?.caption}
                    </SC.ImageText>
                  )}
                </SC.ImageWrapper>
              ))
          )}
        </SC.Article>
      )
    );
  };

  return (
    <ThemeProvider theme={themeFDK}>
      <SC.InformationPage id='content' className='container'>
        {page()}
      </SC.InformationPage>
    </ThemeProvider>
  );
};

export default compose<FC<Props>>(memo, withRouter)(FancyInformationPage);

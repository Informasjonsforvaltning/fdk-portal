import React, { FC, memo } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Helmet } from 'react-helmet';

import { CircularProgress } from '@mui/material';
import localization from '../../lib/localization';

import {
  TransportArticle,
  useGetTransportArticleBySlugQuery
} from '../../api/generated/cms/graphql';

import ErrorPage from '../error-page';

import {
  getLocalizedAttributes,
  isBasicImage,
  isBasicParagraph,
  isBasicYoutube
} from '../../lib/strapi';
import Markdown from '../../components/markdown';
import { themeNAP } from '../../app/theme';

import SC from './styled';
import YoutubeEmbed from '../../components/youtube-embed';
import { Entity } from '../../types/enums';
import { getConfig } from '../../config';

interface Props extends RouteComponentProps {}

const FDK_CMS_BASE_URI = getConfig().cmsV2Api.host;

const TransportPage: FC<Props> = () => {
  const { data, loading, error } = useGetTransportArticleBySlugQuery({
    variables: {
      slug: location.pathname
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

    const firstArticle = (data?.transportArticles as TransportArticle[])?.[0];

    if (error?.name !== undefined || !firstArticle) {
      return <ErrorPage errorCode='404' />;
    }

    const transportArticle = getLocalizedAttributes<TransportArticle>(
      firstArticle,
      localization.getLanguage()
    );

    return (
      transportArticle && (
        <>
          <Helmet>
            <title>
              {transportArticle?.title
                ? `${transportArticle.title} - data.norge.no`
                : 'Transportportal - data.norge.no'}
            </title>
            <meta
              name='description'
              content={
                transportArticle?.subtitle
                  ? transportArticle.subtitle.substring(0, 160)
                  : 'Transportportal'
              }
            />
            <meta
              property='og:title'
              content={
                transportArticle?.title
                  ? `${transportArticle.title} - data.norge.no`
                  : 'Transportportal - data.norge.no'
              }
            />
            <meta
              property='og:description'
              content={
                transportArticle?.subtitle
                  ? transportArticle.subtitle.substring(0, 160)
                  : 'Transportportal'
              }
            />
            <meta property='og:type' content='website' />
          </Helmet>
          <SC.Article>
            <SC.Title>{transportArticle?.title}</SC.Title>
            <SC.Description>{transportArticle?.subtitle}</SC.Description>
            {transportArticle?.Content?.map(
              component =>
                (isBasicParagraph(component) && (
                  <SC.Content>
                    <Markdown allowHtml>{component?.Content ?? ''}</Markdown>
                  </SC.Content>
                )) ||
                (isBasicImage(component) && (
                  <SC.ImageWrapper key={component?.id}>
                    <SC.Image
                      alt={`${component?.media?.alternativeText}`}
                      src={`${FDK_CMS_BASE_URI}${component?.media?.url}`}
                    />
                    {component?.media?.caption && (
                      <SC.ImageText>
                        {localization.informationPage.imageText}
                        {component?.media?.caption}
                      </SC.ImageText>
                    )}
                  </SC.ImageWrapper>
                )) ||
                (isBasicYoutube(component) && (
                  <YoutubeEmbed key={component?.id} url={component?.url} />
                ))
            )}
          </SC.Article>
        </>
      )
    );
  };

  return (
    <ThemeProvider theme={themeNAP.extendedColors[Entity.DATASET]}>
      <SC.TransportPage id='content' className='container'>
        {page()}
      </SC.TransportPage>
    </ThemeProvider>
  );
};

export default compose<FC<Props>>(memo, withRouter)(TransportPage);

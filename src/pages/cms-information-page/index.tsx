import React, { FC, memo, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import localization from '../../lib/localization';

import {
  FancyArticle,
  useGetFancyArticleBySlugQuery
} from '../../api/generated/cms/graphql';

import ErrorPage from '../error-page';

import {
  getLocalizedAttributes,
  isBasicImage,
  isBasicParagraph,
  isBasicYoutube
} from '../../lib/strapi';
import Markdown from '../../components/markdown';

import SC from './styled';
import { getConfig } from '../../config';
import YoutubeEmbed from '../../components/youtube-embed';
import Spinner from '../../components/spinner';

export interface Props extends RouteComponentProps {}

const FDK_CMS_BASE_URI = getConfig().cmsV2Api.host;

const InformationPage: FC<Props> = () => {
  useEffect(() => {
    const appRoot = document.querySelector('#root > div');
    appRoot?.classList.add('white-bg');
    return () => appRoot?.classList.remove('white-bg');
  });

  const { data, loading, error } = useGetFancyArticleBySlugQuery({
    variables: {
      slug: location.pathname
    }
  });

  const firstArticle = (data?.fancyArticles as FancyArticle[])?.[0];

  const page = () => {
    if (loading) {
      return <Spinner />;
    }

    if (error?.name !== undefined || !firstArticle) {
      return <ErrorPage errorCode='404' />;
    }

    const fancyArticle = getLocalizedAttributes<FancyArticle>(
      firstArticle,
      localization.getLanguage()
    );

    return (
      fancyArticle && (
        <SC.Article>
          <SC.Title>{fancyArticle?.title}</SC.Title>
          <SC.Description>{fancyArticle?.subtitle}</SC.Description>
          {fancyArticle?.Content?.map(
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
      )
    );
  };

  return (
    <SC.InformationPage id='content' className='container'>
      <Helmet>
        <title>
          {firstArticle?.title
            ? `${firstArticle.title} - data.norge.no`
            : `${localization.head.title} - data.norge.no`}
        </title>
        <meta
          name='description'
          content={
            firstArticle?.subtitle
              ? firstArticle.subtitle.substring(0, 160)
              : localization.head.description
          }
        />
        <meta
          property='og:title'
          content={
            firstArticle?.title
              ? `${firstArticle.title} - data.norge.no`
              : `${localization.head.title} - data.norge.no`
          }
        />
        <meta
          property='og:description'
          content={
            firstArticle?.subtitle
              ? firstArticle.subtitle.substring(0, 160)
              : localization.head.description
          }
        />
        <meta property='og:type' content='website' />
      </Helmet>
      {page()}
    </SC.InformationPage>
  );
};

export default compose<FC<Props>>(memo, withRouter)(InformationPage);

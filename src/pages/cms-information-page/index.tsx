import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, useLocation, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import localization from '../../lib/localization';

import { FancyArticle } from '../../api/generated/cms/graphql';
import { getFancyArticleBySlug } from '../../api/cms/fancy-article';

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
  const location = useLocation();
  const [fancyArticles, setFancyArticles] = useState<FancyArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const appRoot = document.querySelector('#root > div');
    appRoot?.classList.add('white-bg');
    return () => appRoot?.classList.remove('white-bg');
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const articles = await getFancyArticleBySlug(location.pathname);
        setFancyArticles(articles ?? []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [location.pathname]);

  const firstArticle = fancyArticles?.[0];

  const page = () => {
    if (loading) {
      return <Spinner />;
    }

    if (error || !firstArticle) {
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

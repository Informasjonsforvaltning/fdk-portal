import React, { FC, memo, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import localization from '../../lib/localization';

import {
  FancyArticle,
  FancyArticleEntity,
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

  const fancyArticleEntity = (
    data?.fancyArticles?.data as FancyArticleEntity[]
  )?.[0];

  const page = () => {
    if (loading) {
      return <Spinner />;
    }

    if (error?.name !== undefined || !fancyArticleEntity) {
      return <ErrorPage errorCode='404' />;
    }

    const fancyArticle = getLocalizedAttributes<
      FancyArticleEntity,
      FancyArticle
    >(fancyArticleEntity as FancyArticleEntity, localization.getLanguage());

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
      {page()}
    </SC.InformationPage>
  );
};

export default compose<FC<Props>>(memo, withRouter)(InformationPage);

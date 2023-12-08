import React, { FC, memo, useEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import localization from '../../lib/localization';

import { useGetFancyArticleQuery } from '../../api/generated/cms/graphql';

import {
  PATHNAME_ABOUT_CONCEPTS,
  PATHNAME_ABOUT_DATA_SERVICES,
  PATHNAME_ABOUT_DATASETS,
  PATHNAME_ABOUT_INFORMATIONMODELS,
  PATHNAME_ABOUT_HARVESTING,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_TERMS_OF_USE,
  PATHNAME_PUBLISHING,
  PATHNAME_GUIDANCE,
  PATHNAME_GUIDANCE_METADATA,
  PATHNAME_ABOUT
} from '../../constants/constants';

import ErrorPage from '../error-page';

import {
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

const articleIds: { [pathname: string]: string } = {
  [PATHNAME_ABOUT]: '26',
  [PATHNAME_ABOUT_DATASETS]: '7',
  [PATHNAME_ABOUT_CONCEPTS]: '6',
  [PATHNAME_ABOUT_DATA_SERVICES]: '5',
  [PATHNAME_ABOUT_INFORMATIONMODELS]: '8',
  [PATHNAME_ABOUT_HARVESTING]: '29',
  [PATHNAME_ABOUT_REGISTRATION]: '43',
  [PATHNAME_GUIDANCE]: '23',
  [PATHNAME_GUIDANCE_METADATA]: '21',
  [`${PATHNAME_PUBLISHING}${PATHNAME_ABOUT_HARVESTING}`]: '29',
  [`${PATHNAME_PUBLISHING}${PATHNAME_ABOUT_REGISTRATION}`]: '43',
  [`${PATHNAME_PUBLISHING}${PATHNAME_TERMS_OF_USE}`]: '12'
};

const InformationPage: FC<Props> = () => {
  useEffect(() => {
    const appRoot = document.querySelector('#root > div');
    appRoot?.classList.add('white-bg');
    return () => appRoot?.classList.remove('white-bg');
  });

  Object.entries(articleIds).map((id, i) =>
    i !== 0
      ? useGetFancyArticleQuery({
          variables: {
            id: articleIds[id[0]]
          }
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
      return <Spinner />;
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

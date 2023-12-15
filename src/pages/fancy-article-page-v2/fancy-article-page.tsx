import React, { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { CircularProgress } from '@mui/material';
import {
  FancyArticle,
  FancyArticleEntity,
  useGetFancyArticleQuery
} from '../../api/generated/cms/graphql';
import ErrorPage from '../error-page';
import withErrorBoundary from '../../components/with-error-boundary';
import localization from '../../lib/localization';
import SC from './styled';
import Markdown from '../../components/markdown';
import {
  getLocalizedAttributes,
  isBasicImage,
  isBasicParagraph,
  isBasicYoutube
} from '../../lib/strapi';
import YoutubeEmbed from '../../components/youtube-embed';
import { getConfig } from '../../config';

const FDK_CMS_BASE_URI = getConfig().cmsV2Api.host;

const FancyArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useGetFancyArticleQuery({
    variables: { id }
  });

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

  const fancyArticle = getLocalizedAttributes<FancyArticleEntity, FancyArticle>(
    fancyArticleEntity as FancyArticleEntity,
    localization.getLanguage()
  );

  return (
    <main id='content' className='container'>
      {fancyArticle && (
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
      )}
    </main>
  );
};

const enhance = compose(withErrorBoundary(ErrorPage));
export const FancyArticlePageV2 = enhance(memo(FancyArticlePage));

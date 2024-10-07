import React, { FC, memo } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { CircularProgress } from '@mui/material';
import localization from '../../lib/localization';

import {
  TransportArticle,
  useGetTransportArticleQuery
} from '../../api/generated/cms/graphql';

import {
  PATHNAME_TRANSPORT_GENERAL,
  PATHNAME_TRANSPORT_ITS,
  PATHNAME_TRANSPORT_ROLES,
  PATHNAME_TRANSPORT_ADD,
  PATHNAME_TRANSPORT_COMPLIANCE,
  PATHNAME_TRANSPORT_NEWS
} from '../../constants/constants';

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

const articleIds: { [pathname: string]: string } = {
  [PATHNAME_TRANSPORT_GENERAL]: '2',
  [PATHNAME_TRANSPORT_ROLES]: '3',
  [PATHNAME_TRANSPORT_ITS]: '4',
  [PATHNAME_TRANSPORT_NEWS]: '6',
  [PATHNAME_TRANSPORT_COMPLIANCE]: '9',
  [PATHNAME_TRANSPORT_ADD]: '10'
};

const TransportPage: FC<Props> = () => {
  const { data, loading, error } = useGetTransportArticleQuery({
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

    if (error?.name !== undefined || !data || !data.transportArticle) {
      return <ErrorPage errorCode='404' />;
    }

    const transportArticle = getLocalizedAttributes<TransportArticle>(
      data.transportArticle as TransportArticle,
      localization.getLanguage()
    );

    return (
      transportArticle && (
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

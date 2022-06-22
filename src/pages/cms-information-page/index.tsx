import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import env from '../../env';
import localization from '../../lib/localization';

import { useGetFancyArticleQuery } from '../../api/generated/cms/graphql';

import {
  PATHNAME_ABOUT_CONCEPTS,
  PATHNAME_ABOUT_DATA_SERVICES,
  PATHNAME_ABOUT_DATASETS,
  PATHNAME_ABOUT_INFORMATIONMODELS
} from '../../constants/constants';

import ErrorPage from '../../components/error-page';

import { isBasicImage, isBasicParagraph } from '../../lib/strapi';
import Markdown from '../../components/markdown';
import { themeFDK } from '../../app/theme';
import { Entity } from '../../types/enums';

import SC from './styled';

interface Props extends RouteComponentProps {}

const { FDK_CMS_BASE_URI } = env;

const articleIds: { [pathname: string]: string } = {
  [PATHNAME_ABOUT_DATASETS]: '7',
  [PATHNAME_ABOUT_CONCEPTS]: '6',
  [PATHNAME_ABOUT_DATA_SERVICES]: '5',
  [PATHNAME_ABOUT_INFORMATIONMODELS]: '8'
};

const getEntityFromPath = (pathname: string) => {
  switch (pathname) {
    case PATHNAME_ABOUT_DATASETS:
      return Entity.DATASET;
    case PATHNAME_ABOUT_DATA_SERVICES:
      return Entity.DATA_SERVICE;
    case PATHNAME_ABOUT_CONCEPTS:
      return Entity.CONCEPT;
    case PATHNAME_ABOUT_INFORMATIONMODELS:
      return Entity.INFORMATION_MODEL;
    default:
      return Entity.DATASET;
  }
};

const InformationPage: FC<Props> = () => {
  const [navOpen, setNavOpen] = useState(false);

  const entity = getEntityFromPath(location.pathname);

  useEffect(() => {
    const appRoot = document.querySelector('#root > div');
    appRoot?.classList.add(entity);
    return () => appRoot?.classList.remove(entity);
  });

  const { data } = useGetFancyArticleQuery({
    variables: { id: articleIds[location.pathname] }
  });

  if (!data || !data.fancyArticle) {
    return <ErrorPage errorCode='404' />;
  }

  const { fancyArticle } = data;
  const { title, subtitle, Content } = fancyArticle;

  const menuItems = [
    {
      id: PATHNAME_ABOUT_DATASETS,
      title: localization.informationPage.aboutDatasets
    },
    {
      id: PATHNAME_ABOUT_DATA_SERVICES,
      title: localization.informationPage.aboutDataServices
    },
    {
      id: PATHNAME_ABOUT_CONCEPTS,
      title: localization.informationPage.aboutConcepts
    },
    {
      id: PATHNAME_ABOUT_INFORMATIONMODELS,
      title: localization.informationPage.aboutInformationModels
    }
  ];

  return (
    <ThemeProvider theme={themeFDK.extendedColors[entity]}>
      <SC.InformationPage id='content' className='container'>
        <SC.Aside>
          <SC.MenuToggle onClick={() => setNavOpen(!navOpen)}>
            {
              localization.detailsPage.navMenuButton[
                navOpen ? 'open' : 'closed'
              ]
            }
          </SC.MenuToggle>
          <SC.SideMenu menuItems={menuItems} />
          {navOpen && <SC.SideMenuSmall menuItems={menuItems} />}
        </SC.Aside>
        <SC.Article>
          <SC.Title>{title}</SC.Title>
          <SC.Description>{subtitle}</SC.Description>
          {Content?.map(
            component =>
              (isBasicParagraph(component) && (
                <SC.Content>
                  <Markdown allowHtml>{component?.Content ?? ''}</Markdown>
                </SC.Content>
              )) ||
              (isBasicImage(component) && (
                <SC.ImageWrapper key={component?.id}>
                  <SC.Image
                    alt={`${component?.media?.[0]?.alternativeText}`}
                    src={`${FDK_CMS_BASE_URI}${component?.media?.[0]?.url}`}
                  />
                  {component?.media?.[0]?.caption && (
                    <SC.ImageText>
                      {localization.informationPage.imageText}
                      {component?.media?.[0]?.caption}
                    </SC.ImageText>
                  )}
                </SC.ImageWrapper>
              ))
          )}
        </SC.Article>
      </SC.InformationPage>
    </ThemeProvider>
  );
};

export default compose<FC<Props>>(memo, withRouter)(InformationPage);

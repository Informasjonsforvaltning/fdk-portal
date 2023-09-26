import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { CircularProgress } from '@mui/material';
import env from '../../env';
import localization from '../../lib/localization';

import { useGetFancyArticleQuery } from '../../api/generated/cms/graphql';

import {
  PATHNAME_ABOUT_CONCEPTS,
  PATHNAME_ABOUT_DATA_SERVICES,
  PATHNAME_ABOUT_DATASETS,
  PATHNAME_ABOUT_INFORMATIONMODELS
} from '../../constants/constants';

import ErrorPage from '../error-page';

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
  const [isSticky, setSticky] = useState(false);

  const entity = getEntityFromPath(location.pathname);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    currentScrollPos > 300 ? setSticky(true) : setSticky(false);
  };

  function debounce(fn: any, delay: any) {
    return function deb() {
      clearTimeout(fn._tId);
      fn._tId = setTimeout(() => {
        fn();
      }, delay);
    };
  }

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 50));
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, [debounce, handleScroll]);

  useEffect(() => {
    const appRoot = document.querySelector('#root > div');
    appRoot?.classList.add(entity);
    return () => appRoot?.classList.remove(entity);
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

  const menuItems = [
    {
      id: PATHNAME_ABOUT_DATASETS,
      title: localization.menu.aboutDatasets
    },
    {
      id: PATHNAME_ABOUT_DATA_SERVICES,
      title: localization.menu.aboutDataServices
    },
    {
      id: PATHNAME_ABOUT_CONCEPTS,
      title: localization.menu.aboutConcepts
    },
    {
      id: PATHNAME_ABOUT_INFORMATIONMODELS,
      title: localization.menu.aboutInformationModels
    }
  ];

  return (
    <ThemeProvider theme={themeFDK.extendedColors[entity]}>
      <SC.InformationPage id='content' className='container'>
        <SC.Aside>
          <SC.MenuToggle onClick={() => setNavOpen(!navOpen)}>
            <SC.HamburgerIcon />
            {
              localization.detailsPage.navMenuButton[
                navOpen ? 'open' : 'closed'
              ]
            }
          </SC.MenuToggle>
          <SC.SideMenu isSticky={isSticky} menuItems={menuItems} />
          {navOpen && <SC.SideMenuSmall menuItems={menuItems} />}
        </SC.Aside>
        {page()}
      </SC.InformationPage>
    </ThemeProvider>
  );
};

export default compose<FC<Props>>(memo, withRouter)(InformationPage);

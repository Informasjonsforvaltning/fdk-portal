import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { CircularProgress } from '@mui/material';
import env from '../../env';
import localization from '../../lib/localization';

import { useGetTransportArticleQuery } from '../../api/generated/cms/graphql';

import { PATHNAME_TRANSPORT } from '../../constants/constants';

import ErrorPage from '../../components/error-page';

import { isBasicImage, isBasicParagraph } from '../../lib/strapi';
import Markdown from '../../components/markdown';
import { themeNAP } from '../../app/theme';

import SC from './styled';

interface Props extends RouteComponentProps {}

const { FDK_CMS_BASE_URI } = env;

const articleIds: { [pathname: string]: string } = {
  [PATHNAME_TRANSPORT]: '3'
};

const InformationPage: FC<Props> = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

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

    const {
      transportArticle: { data: transportArticleEntity }
    } = data;

    const transportArticle = transportArticleEntity?.attributes;

    return (
      transportArticle && (
        <SC.Article>
          <SC.Title>{transportArticle.title}</SC.Title>
          <SC.Description>{transportArticle.subtitle}</SC.Description>
          {transportArticle.Content?.map(
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
      id: PATHNAME_TRANSPORT,
      title: 'Transport'
    }
  ];

  return (
    <ThemeProvider theme={themeNAP.extendedColors}>
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

import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { CircularProgress } from '@mui/material';
import env from '../../env';
import localization from '../../lib/localization';

import { useGetTransportArticleQuery } from '../../api/generated/cms/graphql';

import {
  PATHNAME_TRANSPORT_GENERAL,
  PATHNAME_TRANSPORT_GENERAL_INFO_ABOUT_THE_PORTAL,
  PATHNAME_TRANSPORT_GENERAL_ITS,
  PATHNAME_TRANSPORT_GENERAL_ROLES,
  PATHNAME_TRANSPORT_PROVIDERS_ADD,
  PATHNAME_TRANSPORT_PROVIDERS_COMPLIANCE,
  PATHNAME_TRANSPORT_USERS_DATA_IN_NAP,
  PATHNAME_TRANSPORT_USERS_NEWS,
  PATHNAME_TRANSPORT_USERS_WHAT,
  PATHNAME_TRANSPORT_USERS_WHERE
} from '../../constants/constants';

import ErrorPage from '../error-page';

import {
  isBasicImage,
  isBasicParagraph,
  isBasicYoutube
} from '../../lib/strapi';
import Markdown from '../../components/markdown';
import { themeNAP } from '../../app/theme';

import SC from './styled';
import YoutubeEmbed from '../../components/youtube-embed';
import { Entity } from '../../types/enums';

interface Props extends RouteComponentProps {}

const { FDK_CMS_BASE_URI } = env;

const articleIds: { [pathname: string]: string } = {
  [PATHNAME_TRANSPORT_GENERAL]: '2',
  [PATHNAME_TRANSPORT_GENERAL_ROLES]: '3',
  [PATHNAME_TRANSPORT_GENERAL_ITS]: '4',
  [PATHNAME_TRANSPORT_GENERAL_INFO_ABOUT_THE_PORTAL]: '5',
  [PATHNAME_TRANSPORT_USERS_DATA_IN_NAP]: '',
  [PATHNAME_TRANSPORT_USERS_NEWS]: '6',
  [PATHNAME_TRANSPORT_USERS_WHERE]: '7',
  [PATHNAME_TRANSPORT_USERS_WHAT]: '8',
  [PATHNAME_TRANSPORT_PROVIDERS_COMPLIANCE]: '9',
  [PATHNAME_TRANSPORT_PROVIDERS_ADD]: '10'
};

const TransportPage: FC<Props> = () => {
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
              )) ||
              (isBasicYoutube(component) && (
                <YoutubeEmbed key={component?.id} url={component?.url} />
              ))
          )}
        </SC.Article>
      )
    );
  };

  const menuItems = [
    {
      id: PATHNAME_TRANSPORT_GENERAL,
      title: localization.menu.transportGeneral,
      items: [
        {
          id: PATHNAME_TRANSPORT_GENERAL_INFO_ABOUT_THE_PORTAL,
          title: localization.menu.transportInformationAboutThePortal
        },
        {
          id: PATHNAME_TRANSPORT_GENERAL_ROLES,
          title: localization.menu.transportRolesAndResponsibilies
        },
        {
          id: PATHNAME_TRANSPORT_GENERAL_ITS,
          title: localization.menu.transportItsDirectiveAndDelegatedRegulations
        }
      ]
    },
    {
      title: localization.menu.transportUsers,
      items: [
        {
          id: PATHNAME_TRANSPORT_USERS_NEWS,
          title: localization.menu.transportNews
        },
        {
          id: PATHNAME_TRANSPORT_USERS_WHERE,
          title: localization.menu.transportWhereDoIFindTheData
        },
        {
          id: PATHNAME_TRANSPORT_USERS_WHAT,
          title: localization.menu.transportWhatDataIsAvailable
        },
        {
          id: PATHNAME_TRANSPORT_USERS_DATA_IN_NAP,
          title: localization.menu.transportDataInNap
        }
      ]
    },
    {
      title: localization.menu.transportProviders,
      items: [
        {
          id: PATHNAME_TRANSPORT_PROVIDERS_ADD,
          title: localization.menu.transportAddData
        },
        {
          id: PATHNAME_TRANSPORT_PROVIDERS_COMPLIANCE,
          title: localization.menu.transportDeclarationOfCompliance
        }
      ]
    }
  ];

  return (
    <ThemeProvider theme={themeNAP.extendedColors[Entity.DATASET]}>
      <SC.TransportPage id='content' className='container'>
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
      </SC.TransportPage>
    </ThemeProvider>
  );
};

export default compose<FC<Props>>(memo, withRouter)(TransportPage);

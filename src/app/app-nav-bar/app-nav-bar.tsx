import React, { FC } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import PortalDropdownMenu from '../../components/dropdown-menu';

import localization from '../../lib/localization';
import {
  PATHNAME_REPORTS,
  PATHNAME_ABOUT,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_ABOUT_NAP,
  PATHNAME_HOME_NAP,
  PATHNAME_ORGANIZATIONS,
  PATHNAME_PUBLISHING
} from '../../constants/constants';

import { themeFDK, themeNAP } from '../theme';
import { getConfig } from '../../config';
import SC from './styled';

const isTransportportal = getConfig().themeNap;

interface Props {
  onChangeLanguage: (language: string) => void;
}

const getMenuItems: any = (isNap: boolean) =>
  isNap
    ? [
        {
          label: localization.menu.aboutNap,
          url: PATHNAME_ABOUT_NAP,
          hrefLink: true
        },
        {
          label: localization.menu.aboutRegistration,
          url: PATHNAME_ABOUT_REGISTRATION
        },
        {
          label: localization.menu.organizations,
          url: PATHNAME_ORGANIZATIONS
        },
        {
          label: localization.menu.reports,
          url: PATHNAME_REPORTS
        }
      ]
    : [
        {
          label: localization.menu.about,
          url: PATHNAME_ABOUT
        },
        {
          label: localization.menu.organizations,
          url: PATHNAME_ORGANIZATIONS
        },
        {
          label: localization.menu.reports,
          url: PATHNAME_REPORTS
        },
        {
          label: localization.menu.publishing,
          url: PATHNAME_PUBLISHING,
          hrefLink: true,
          externalIcon: true
        }
      ];

const MenuItems: FC = () =>
  getMenuItems(isTransportportal).map(
    ({ label, url, hrefLink = false, externalIcon = false }: any) => (
      <li key={label}>
        {hrefLink ? (
          <SC.Link href={url} {...(externalIcon && { external: true })}>
            {label}
          </SC.Link>
        ) : (
          <SC.Link
            as={RouteLink}
            to={url}
            {...(externalIcon && { external: true })}
          >
            {label}
          </SC.Link>
        )}
      </li>
    )
  );

export const AppNavBar: FC<Props> = ({ onChangeLanguage }) => {
  const Logo = getConfig().useDemoLogo ? <SC.DemoLogo /> : <SC.Logo />;

  const languageItems = [
    {
      label: localization.lang['norwegian-nb'],
      onClick: () => onChangeLanguage('nb')
    },
    {
      label: localization.lang['norwegian-nn'],
      onClick: () => onChangeLanguage('nn')
    },
    {
      label: localization.lang['english-en'],
      onClick: () => onChangeLanguage('en')
    }
  ];

  return (
    <ThemeProvider theme={isTransportportal ? themeNAP : themeFDK}>
      <SC.Header>
        <SC.Container>
          <SC.Link
            title={
              isTransportportal
                ? localization.linkToNap
                : localization.linkToFdk
            }
            href={isTransportportal ? PATHNAME_HOME_NAP : '/'}
          >
            {isTransportportal ? <SC.NapLogo /> : Logo}
          </SC.Link>
          <SC.ContentWrapper>
            <SC.NavigationLinks>
              <MenuItems />
            </SC.NavigationLinks>

            <PortalDropdownMenu
              desktopView
              mobileView={false}
              caret
              title={localization.lang.chosenLanguage}
              menuItems={languageItems}
            />
          </SC.ContentWrapper>
          <PortalDropdownMenu
            desktopView={false}
            mobileView
            caret
            title={localization.app.menu}
            menuItems={[...getMenuItems(isTransportportal), ...languageItems]}
          />
        </SC.Container>
      </SC.Header>
    </ThemeProvider>
  );
};

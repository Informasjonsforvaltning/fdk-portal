import React, { FC } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

import PortalDropdownMenu from '../../components/dropdown-menu';

import env from '../../env';

import localization from '../../lib/localization';
import {
  PATHNAME_REPORTS,
  PATHNAME_ABOUT,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_ABOUT_NAP,
  PATHNAME_HOME_NAP,
  PATHNAME_ORGANIZATIONS,
  PATHNAME_PUBLISHING,
  PATHNAME_SPARQL,
  PATHNAME_ABOUT_DATASETS,
  PATHNAME_GUIDANCE,
  PATHNAME_NEWS_ARCHIVE
} from '../../constants/constants';

import { themeFDK, themeNAP } from '../theme';
import { getConfig } from '../../config';
import SC from './styled';

const isTransportportal = getConfig().themeNap;

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props {
  onChangeLanguage: (language: string) => void;
}

const transportItems = () => (
  <>
    <SC.ListItem key={localization.menu.aboutNap}>
      <Link href={PATHNAME_ABOUT_NAP}>{localization.menu.aboutNap}</Link>
    </SC.ListItem>
    <SC.ListItem key={localization.menu.aboutRegistration}>
      <Link as={RouteLink} to={PATHNAME_ABOUT_REGISTRATION}>
        {localization.menu.aboutRegistration}
      </Link>
    </SC.ListItem>
    <SC.ListItem key={localization.menu.organizations}>
      <Link as={RouteLink} to={PATHNAME_ORGANIZATIONS}>
        {localization.menu.organizations}
      </Link>
    </SC.ListItem>
    <SC.ListItem key={localization.menu.tools.reports}>
      <Link as={RouteLink} to={PATHNAME_REPORTS}>
        {localization.menu.tools.reports}
      </Link>
    </SC.ListItem>
    <SC.ListItem key={localization.menu.community}>
      <Link href={FDK_COMMUNITY_BASE_URI} external>
        {localization.menu.community}
      </Link>
    </SC.ListItem>
  </>
);

const fdkItems = () => (
  <>
    <SC.ListItem key={localization.menu.about}>
      <PortalDropdownMenu
        desktopView
        openOnHover
        hideOnBlur
        caret={false}
        mobileView={false}
        title={localization.menu.about}
      >
        <SC.ListItem key={localization.menu.about}>
          <Link as={RouteLink} to={PATHNAME_ABOUT}>
            {localization.menu.about}
          </Link>
        </SC.ListItem>
        <SC.ListItem key={localization.menu.aboutCatalogs}>
          <Link as={RouteLink} to={PATHNAME_ABOUT_DATASETS}>
            {localization.menu.aboutCatalogs}
          </Link>
        </SC.ListItem>
        <SC.ListItem key={localization.menu.guidance}>
          <Link as={RouteLink} to={PATHNAME_GUIDANCE}>
            {localization.menu.guidance}
          </Link>
        </SC.ListItem>
        <SC.ListItem key={localization.menu.newsArchive}>
          <Link as={RouteLink} to={PATHNAME_NEWS_ARCHIVE}>
            {localization.menu.newsArchive}
          </Link>
        </SC.ListItem>
      </PortalDropdownMenu>
    </SC.ListItem>
    <SC.ListItem key={localization.menu.organizations}>
      <Link as={RouteLink} to={PATHNAME_ORGANIZATIONS}>
        {localization.menu.organizations}
      </Link>
    </SC.ListItem>
    <SC.ListItem
      key={localization.menu.tools.tools}
      className='hideOnMobileView'
    >
      <PortalDropdownMenu
        desktopView
        openOnHover
        hideOnBlur
        caret={false}
        mobileView={false}
        title={localization.menu.tools.tools}
      >
        <SC.ListItem key={localization.menu.tools.reports}>
          <Link as={RouteLink} to={PATHNAME_REPORTS}>
            {localization.menu.tools.reports}
          </Link>
        </SC.ListItem>
        <SC.ListItem key={localization.menu.tools.sparql}>
          <Link href={PATHNAME_SPARQL}>{localization.menu.tools.sparql}</Link>
        </SC.ListItem>
      </PortalDropdownMenu>
    </SC.ListItem>
    <SC.ListItem key={localization.menu.community}>
      <Link href={FDK_COMMUNITY_BASE_URI} external>
        {localization.menu.community}
      </Link>
    </SC.ListItem>
    <SC.ListItem key={localization.menu.publishing}>
      <Link href={PATHNAME_PUBLISHING} external>
        {localization.menu.publishing}
      </Link>
    </SC.ListItem>
  </>
);

const languageButtons = ({
  onChangeLanguage
}: {
  onChangeLanguage: (language: string) => void;
}) => (
  <>
    <li>
      <SC.Button type='button' onClick={() => onChangeLanguage('nb')} lang='nb'>
        {localization.lang['norwegian-nb']}
      </SC.Button>
    </li>
    <li>
      <SC.Button type='button' onClick={() => onChangeLanguage('nn')} lang='nn'>
        {localization.lang['norwegian-nn']}
      </SC.Button>
    </li>
    <li>
      <SC.Button type='button' onClick={() => onChangeLanguage('en')} lang='en'>
        {localization.lang['english-en']}
      </SC.Button>
    </li>
  </>
);
const Logo = getConfig().useDemoLogo ? <SC.DemoLogo /> : <SC.Logo />;

export const AppNavBar: FC<Props> = ({ onChangeLanguage }) => (
  <ThemeProvider theme={isTransportportal ? themeNAP : themeFDK}>
    <SC.Header>
      <SC.Container role='navigation'>
        <Link
          title={
            isTransportportal ? localization.linkToNap : localization.linkToFdk
          }
          href={isTransportportal ? PATHNAME_HOME_NAP : '/'}
        >
          {isTransportportal ? <SC.NapLogo /> : Logo}
        </Link>
        <SC.ContentWrapper>
          <SC.NavigationLinks>
            {isTransportportal ? transportItems() : fdkItems()}
          </SC.NavigationLinks>

          <PortalDropdownMenu
            ariaLabel='language navigation'
            desktopView
            hideOnBlur
            mobileView={false}
            caret
            title={localization.lang.chosenLanguage}
            titleLang={localization.getLanguage() === 'en' ? 'no' : 'en'}
          >
            {languageButtons({ onChangeLanguage })}
          </PortalDropdownMenu>
        </SC.ContentWrapper>
        <PortalDropdownMenu
          ariaLabel='mobile navigation'
          desktopView={false}
          mobileView
          caret
          title={localization.app.menu}
        >
          {isTransportportal ? transportItems() : fdkItems()}
          {languageButtons({ onChangeLanguage })}
        </PortalDropdownMenu>
      </SC.Container>
    </SC.Header>
  </ThemeProvider>
);

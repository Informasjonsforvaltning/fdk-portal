import type { FC } from 'react';
import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

import DropdownMenu from '../../components/dropdown-menu';

import env from '../../env';

import localization from '../../lib/localization';
import {
  PATHNAME_REPORTS,
  PATHNAME_ABOUT,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_ABOUT_DATASETS,
  PATHNAME_ABOUT_DATA_SERVICES,
  PATHNAME_ABOUT_CONCEPTS,
  PATHNAME_ABOUT_INFORMATIONMODELS,
  PATHNAME_AI,
  PATHNAME_ORGANIZATIONS,
  PATHNAME_PUBLISHING,
  PATHNAME_SPARQL,
  PATHNAME_GUIDANCE,
  PATHNAME_REQUESTS,
  PATHNAME_TRANSPORT_GENERAL,
  PATHNAME_TRANSPORT_ROLES,
  PATHNAME_TRANSPORT_ITS,
  PATHNAME_TRANSPORT_ADD,
  PATHNAME_TRANSPORT_NEWS,
  PATHNAME_TRANSPORT_COMPLIANCE,
  PATHNAME_DATA_HUNTER,
  PATHNAME_GETTING_STARTED
} from '../../constants/constants';

import { themeFDK, themeNAP } from '../theme';
import { getConfig } from '../../config';
import SC from './styled';

const isTransportportal = getConfig().isNapProfile;

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props {
  onChangeLanguage: (language: string) => void;
}

const transportItems = () => [
  <SC.ListItem key={localization.menu.aboutNap}>
    <DropdownMenu
      openOnHover
      chevron
      mobileView={false}
      title={localization.menu.aboutNap}
    >
      <SC.ListItem key={localization.menu.transportGeneral}>
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_GENERAL}>
          {localization.menu.transportGeneral}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.transportRolesAndResponsibilies}>
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_ROLES}>
          {localization.menu.transportRolesAndResponsibilies}
        </Link>
      </SC.ListItem>
      <SC.ListItem
        key={localization.menu.transportItsDirectiveAndDelegatedRegulations}
      >
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_ITS}>
          {localization.menu.transportItsDirectiveAndDelegatedRegulations}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.transportNews}>
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_NEWS}>
          {localization.menu.transportNews}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.transportAddData}>
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_ADD}>
          {localization.menu.transportAddData}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.transportDeclarationOfCompliance}>
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_COMPLIANCE}>
          {localization.menu.transportDeclarationOfCompliance}
        </Link>
      </SC.ListItem>
    </DropdownMenu>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.aboutRegistration}>
    <Link as={RouteLink} to={PATHNAME_ABOUT_REGISTRATION}>
      {localization.menu.aboutRegistration}
    </Link>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.reports}>
    <Link as={RouteLink} to={PATHNAME_REPORTS}>
      {localization.menu.reports}
    </Link>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.community}>
    <Link
      href={FDK_COMMUNITY_BASE_URI}
      external
      aria-label={localization.externalLink}
    >
      {localization.menu.community}
    </Link>
  </SC.ListItem>
];

const fdkItems = () => [
  <SC.ListItem key={localization.menu.about}>
    <DropdownMenu
      openOnHover
      chevron
      mobileView={false}
      title={localization.menu.about}
    >
      <SC.ListItem key={localization.menu.gettingStarted}>
        <Link
          href={PATHNAME_GETTING_STARTED.replace(
            ':lang',
            localization.getLanguage()
          )}
        >
          {localization.menu.gettingStarted}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.about}>
        <Link
          href={PATHNAME_ABOUT.replace(':lang', localization.getLanguage())}
        >
          {localization.menu.about}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.aboutDatasets}>
        <Link
          href={PATHNAME_ABOUT_DATASETS.replace(
            ':lang',
            localization.getLanguage()
          )}
        >
          {localization.menu.aboutDatasets}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.aboutDataServices}>
        <Link
          href={PATHNAME_ABOUT_DATA_SERVICES.replace(
            ':lang',
            localization.getLanguage()
          )}
        >
          {localization.menu.aboutDataServices}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.aboutConcepts}>
        <Link
          href={PATHNAME_ABOUT_CONCEPTS.replace(
            ':lang',
            localization.getLanguage()
          )}
        >
          {localization.menu.aboutConcepts}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.aboutInformationModels}>
        <Link
          href={PATHNAME_ABOUT_INFORMATIONMODELS.replace(
            ':lang',
            localization.getLanguage()
          )}
        >
          {localization.menu.aboutInformationModels}
        </Link>
      </SC.ListItem>
    </DropdownMenu>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.organizations}>
    <Link as={RouteLink} to={PATHNAME_ORGANIZATIONS}>
      {localization.menu.organizations}
    </Link>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.tools}>
    <DropdownMenu
      openOnHover
      chevron
      mobileView={false}
      title={localization.menu.tools}
    >
      <SC.ListItem key={localization.menu.ai}>
        <Link as={RouteLink} to={PATHNAME_AI}>
          {localization.menu.ai}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.tools.reports}>
        <Link as={RouteLink} to={PATHNAME_REPORTS}>
          {localization.menu.reports}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.sparql}>
        <Link href={PATHNAME_SPARQL}>{localization.menu.sparql}</Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.requests}>
        <Link href={PATHNAME_REQUESTS}>{localization.menu.requests}</Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.datahunter}>
        <Link href={PATHNAME_DATA_HUNTER}>{localization.menu.datahunter}</Link>
      </SC.ListItem>
    </DropdownMenu>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.community}>
    <Link href={FDK_COMMUNITY_BASE_URI} external>
      {localization.menu.community}
    </Link>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.publishing}>
    <Link href={PATHNAME_PUBLISHING} external>
      {localization.menu.publishing}
    </Link>
  </SC.ListItem>
];

const transportItemsMobile = () => [
  <SC.ListItem key={localization.menu.aboutNap}>
    {localization.menu.aboutNap}
    <ul>
      <SC.ListItem key={localization.menu.transportGeneral}>
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_GENERAL}>
          {localization.menu.transportGeneral}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.transportRolesAndResponsibilies}>
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_ROLES}>
          {localization.menu.transportRolesAndResponsibilies}
        </Link>
      </SC.ListItem>
      <SC.ListItem
        key={localization.menu.transportItsDirectiveAndDelegatedRegulations}
      >
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_ITS}>
          {localization.menu.transportItsDirectiveAndDelegatedRegulations}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.transportNews}>
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_NEWS}>
          {localization.menu.transportNews}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.transportAddData}>
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_ADD}>
          {localization.menu.transportAddData}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.transportDeclarationOfCompliance}>
        <Link as={RouteLink} to={PATHNAME_TRANSPORT_COMPLIANCE}>
          {localization.menu.transportDeclarationOfCompliance}
        </Link>
      </SC.ListItem>
    </ul>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.aboutRegistration}>
    <Link as={RouteLink} to={PATHNAME_ABOUT_REGISTRATION}>
      {localization.menu.aboutRegistration}
    </Link>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.reports}>
    <Link as={RouteLink} to={PATHNAME_REPORTS}>
      {localization.menu.reports}
    </Link>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.community}>
    <Link
      href={FDK_COMMUNITY_BASE_URI}
      external
      aria-label={localization.externalLink}
    >
      {localization.menu.community}
    </Link>
  </SC.ListItem>
];

const fdkItemsMobile = () => [
  <SC.ListItem key={localization.menu.about}>
    {localization.menu.about}
    <ul>
      <SC.ListItem key={localization.menu.gettingStarted}>
        <Link
          href={PATHNAME_GETTING_STARTED.replace(
            ':lang',
            localization.getLanguage()
          )}
        >
          {localization.menu.gettingStarted}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.about}>
        <Link
          href={PATHNAME_ABOUT.replace(':lang', localization.getLanguage())}
        >
          {localization.menu.about}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.aboutDatasets}>
        <Link
          href={PATHNAME_ABOUT_DATASETS.replace(
            ':lang',
            localization.getLanguage()
          )}
        >
          {localization.menu.aboutDatasets}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.aboutDataServices}>
        <Link
          href={PATHNAME_ABOUT_DATA_SERVICES.replace(
            ':lang',
            localization.getLanguage()
          )}
        >
          {localization.menu.aboutDataServices}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.aboutConcepts}>
        <Link
          href={PATHNAME_ABOUT_CONCEPTS.replace(
            ':lang',
            localization.getLanguage()
          )}
        >
          {localization.menu.aboutConcepts}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.aboutInformationModels}>
        <Link
          href={PATHNAME_ABOUT_INFORMATIONMODELS.replace(
            ':lang',
            localization.getLanguage()
          )}
        >
          {localization.menu.aboutInformationModels}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.guidance}>
        <Link as={RouteLink} to={PATHNAME_GUIDANCE}>
          {localization.menu.guidance}
        </Link>
      </SC.ListItem>
    </ul>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.organizations}>
    <Link as={RouteLink} to={PATHNAME_ORGANIZATIONS}>
      {localization.menu.organizations}
    </Link>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.tools}>
    {localization.menu.tools}
    <ul>
      <SC.ListItem key={localization.menu.ai}>
        <Link as={RouteLink} to={PATHNAME_AI}>
          {localization.menu.ai}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.tools.reports}>
        <Link as={RouteLink} to={PATHNAME_REPORTS}>
          {localization.menu.reports}
        </Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.sparql}>
        <Link href={PATHNAME_SPARQL}>{localization.menu.sparql}</Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.requests}>
        <Link href={PATHNAME_REQUESTS}>{localization.menu.requests}</Link>
      </SC.ListItem>
      <SC.ListItem key={localization.menu.datahunter}>
        <Link href={PATHNAME_DATA_HUNTER}>{localization.menu.datahunter}</Link>
      </SC.ListItem>
    </ul>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.community}>
    <Link href={FDK_COMMUNITY_BASE_URI} external>
      {localization.menu.community}
    </Link>
  </SC.ListItem>,
  <SC.ListItem key={localization.menu.publishing}>
    <Link href={PATHNAME_PUBLISHING} external>
      {localization.menu.publishing}
    </Link>
  </SC.ListItem>
];

const languageButtons = ({
  onChangeLanguage
}: {
  onChangeLanguage: (language: string) => void;
}) => [
  <li>
    <SC.Button type='button' onClick={() => onChangeLanguage('nb')} lang='nb'>
      {localization.lang['norwegian-nb']}
    </SC.Button>
  </li>,
  <li>
    <SC.Button type='button' onClick={() => onChangeLanguage('nn')} lang='nn'>
      {localization.lang['norwegian-nn']}
    </SC.Button>
  </li>,
  <li>
    <SC.Button type='button' onClick={() => onChangeLanguage('en')} lang='en'>
      {localization.lang['english-en']}
    </SC.Button>
  </li>
];
const Logo = getConfig().useDemoLogo ? <SC.DemoLogo /> : <SC.Logo />;

export const AppNavBar: FC<Props> = ({ onChangeLanguage }) => (
  <ThemeProvider theme={isTransportportal ? themeNAP : themeFDK}>
    <SC.Header>
      <div className='container'>
        <SC.Nav role='navigation'>
          <Link
            title={
              isTransportportal
                ? localization.linkToNap
                : localization.linkToFdk
            }
            href='/'
          >
            {isTransportportal ? <SC.NapLogo /> : Logo}
          </Link>
          <SC.ContentWrapper>
            <SC.NavigationLinks>
              {isTransportportal ? transportItems() : fdkItems()}
            </SC.NavigationLinks>

            <DropdownMenu
              ariaLabel='language navigation'
              mobileView={false}
              chevron
              title={localization.lang.chosenLanguage}
              titleLang={localization.getLanguage() === 'en' ? 'no' : 'en'}
            >
              {languageButtons({ onChangeLanguage })}
            </DropdownMenu>
          </SC.ContentWrapper>
          <DropdownMenu
            ariaLabel='mobile navigation'
            mobileView
            chevron={false}
            title={localization.app.menu}
          >
            {isTransportportal ? transportItemsMobile() : fdkItemsMobile()}
            <SC.ListItem>
              {localization.lang.chosenLanguage}
              <ul>{languageButtons({ onChangeLanguage })}</ul>
            </SC.ListItem>
          </DropdownMenu>
        </SC.Nav>
      </div>
    </SC.Header>
  </ThemeProvider>
);

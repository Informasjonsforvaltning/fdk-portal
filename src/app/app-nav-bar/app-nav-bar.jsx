import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  Nav,
  NavItem
} from 'reactstrap';

import { ThemeProvider } from 'styled-components';

import PortalDropdownMenu from '../../components/dropdown-menu';

import localization from '../../lib/localization';
import {
  PATHNAME_REPORTS,
  PATHNAME_ABOUT,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_ABOUT_NAP,
  PATHNAME_HOME_NAP,
  PATHNAME_GUIDANCE,
  PATHNAME_ORGANIZATIONS
} from '../../constants/constants';

import { Entity } from '../../types/enums';

import { themeFDK, themeNAP } from '../theme';

import './app-nav-bar.scss';
import { getConfig } from '../../config';

const isTransportportal = getConfig().themeNap;

const theme = {
  entityColours: (isTransportportal ? themeNAP : themeFDK).extendedColors[
    Entity.DATASET
  ]
};

const getMenuItems = isNap =>
  isNap
    ? [
        {
          label: localization.menu.aboutNap,
          url: PATHNAME_ABOUT_NAP
        },
        {
          label: localization.menu.aboutRegistration,
          url: PATHNAME_ABOUT_REGISTRATION
        }
      ]
    : [
        {
          label: localization.menu.guidance,
          url: PATHNAME_GUIDANCE
        },
        {
          label: localization.menu.organizations,
          url: PATHNAME_ORGANIZATIONS
        },
        {
          label: localization.about.about,
          url: PATHNAME_ABOUT
        },
        {
          label: localization.menu.aboutRegistration,
          url: PATHNAME_ABOUT_REGISTRATION
        },
        {
          label: localization.menu.reports,
          url: PATHNAME_REPORTS
        }
      ];

export function AppNavBar(props) {
  const fdkLogoPath = getConfig().useDemoLogo
    ? 'fdk-logo-demo.svg'
    : 'fdk-datanorge-logo.svg';
  const languageItems = [
    {
      label: localization.lang['norwegian-nb'],
      onClick: () => props.onChangeLanguage('nb')
    },
    {
      label: localization.lang['norwegian-nn'],
      onClick: () => props.onChangeLanguage('nn')
    },
    {
      label: localization.lang['english-en'],
      onClick: () => props.onChangeLanguage('en')
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="fdk-header">
        <div className="container">
          <div className="row d-flex justify-content-between align-items-center">
            <div>
              <a
                title={
                  isTransportportal
                    ? localization.linkToNap
                    : localization.linkToFdk
                }
                href={isTransportportal ? PATHNAME_HOME_NAP : '/'}
                className="d-flex"
              >
                <span className="uu-invisible" aria-hidden="false">
                  Gå til forside
                </span>
                <img
                  className={isTransportportal ? 'nap-logo' : 'fdk-logo'}
                  src={
                    isTransportportal
                      ? '/img/logo-transport.svg'
                      : `/img/${fdkLogoPath}`
                  }
                  alt="Logo for Felles datakatalog"
                />
              </a>
            </div>
            <div>
              {!isTransportportal && (
                <Nav className="d-none d-lg-inline-flex">
                  <NavItem>
                    <a className="nav-link" href={PATHNAME_GUIDANCE}>
                      {localization.menu.guidance}
                    </a>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to={PATHNAME_ORGANIZATIONS}>
                      {localization.menu.organizations}
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to={PATHNAME_ABOUT}>
                      {localization.menu.about}
                    </Link>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>{localization.help}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <Link
                          className="nav-link"
                          to={PATHNAME_ABOUT_REGISTRATION}
                        >
                          {localization.menu.aboutRegistration}
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem>
                    <Link className="nav-link" to={PATHNAME_REPORTS}>
                      {localization.menu.reports}
                    </Link>
                  </NavItem>
                </Nav>
              )}
              {isTransportportal && (
                <Nav className="d-none d-lg-inline-flex">
                  <NavItem>
                    <a className="nav-link" href={PATHNAME_ABOUT_NAP}>
                      {localization.menu.aboutNap}
                    </a>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to={PATHNAME_ABOUT_REGISTRATION}>
                      {localization.menu.aboutRegistration}
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to={PATHNAME_ORGANIZATIONS}>
                      {localization.menu.organizations}
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link" to={PATHNAME_REPORTS}>
                      {localization.menu.reports}
                    </Link>
                  </NavItem>
                </Nav>
              )}
            </div>
            <div>
              <PortalDropdownMenu
                desktopView
                caret
                title={localization.lang.chosenLanguage}
                menuItems={languageItems}
              />
              <PortalDropdownMenu
                mobileView
                caret
                title={localization.app.menu}
                menuItems={[
                  ...getMenuItems(isTransportportal),
                  ...languageItems
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

AppNavBar.defaultProps = {};

AppNavBar.propTypes = {
  onChangeLanguage: PropTypes.func.isRequired
};

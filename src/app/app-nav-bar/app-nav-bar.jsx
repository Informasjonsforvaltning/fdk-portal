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
import './app-nav-bar.scss';
import { getConfig } from '../../config';

export function AppNavBar(props) {
  const fdkLogoPath = getConfig().useDemoLogo
    ? 'fdk-logo-demo.svg'
    : 'fdk-datanorge-logo.svg';

  return (
    <div className="fdk-header">
      <div className="container">
        <div className="row d-flex justify-content-between align-items-center">
          <div>
            <a
              title={
                getConfig().themeNap
                  ? localization.linkToNap
                  : localization.linkToFdk
              }
              href={getConfig().themeNap ? PATHNAME_HOME_NAP : '/'}
              className="d-flex"
            >
              <span className="uu-invisible" aria-hidden="false">
                Gå til forside
              </span>
              <img
                className={getConfig().themeNap ? 'nap-logo' : 'fdk-logo'}
                src={
                  getConfig().themeNap
                    ? '/img/logo-transport.svg'
                    : `/img/${fdkLogoPath}`
                }
                alt="Logo for Felles datakatalog"
              />
            </a>
          </div>
          <div>
            {!getConfig().themeNap && (
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
            {getConfig().themeNap && (
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
                  <Link className="nav-link" to={PATHNAME_REPORTS}>
                    {localization.menu.reports}
                  </Link>
                </NavItem>
              </Nav>
            )}
          </div>
          <div>
            <UncontrolledDropdown className="d-none d-lg-inline">
              <DropdownToggle className="fdk-button-lang" caret>
                {localization.lang.chosenLanguage}
              </DropdownToggle>
              <DropdownMenu right className="fdk-dropdownmenu">
                <DropdownItem onClick={() => props.onChangeLanguage('nb')}>
                  {localization.lang['norwegian-nb']}
                </DropdownItem>
                <DropdownItem onClick={() => props.onChangeLanguage('nn')}>
                  {localization.lang['norwegian-nn']}
                </DropdownItem>
                <DropdownItem onClick={() => props.onChangeLanguage('en')}>
                  {localization.lang['english-en']}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown
              tabIndex="0"
              className="fdk-dropdown-menu d-inline d-lg-none"
            >
              <DropdownToggle
                className="fdk-button fdk-button-menu"
                caret
                color="none"
              >
                {localization.app.menu}
              </DropdownToggle>
              {!getConfig().themeNap && (
                <DropdownMenu right className="fdk-dropdownmenu">
                  <Link className="dropdown-item" to={PATHNAME_GUIDANCE}>
                    {localization.menu.guidance}
                  </Link>
                  <Link className="dropdown-item" to={PATHNAME_ORGANIZATIONS}>
                    {localization.menu.organizations}
                  </Link>
                  <Link className="dropdown-item" to={PATHNAME_ABOUT}>
                    {localization.about.about}
                  </Link>
                  <Link
                    className="dropdown-item"
                    to={PATHNAME_ABOUT_REGISTRATION}
                  >
                    {localization.menu.aboutRegistration}
                  </Link>
                  <Link className="dropdown-item" to={PATHNAME_REPORTS}>
                    {localization.menu.reports}
                  </Link>
                  <DropdownItem onClick={() => props.onChangeLanguage('nb')}>
                    {localization.lang['norwegian-nb']}
                  </DropdownItem>
                  <DropdownItem onClick={() => props.onChangeLanguage('nn')}>
                    {localization.lang['norwegian-nn']}
                  </DropdownItem>
                  <DropdownItem onClick={() => props.onChangeLanguage('en')}>
                    {localization.lang['english-en']}
                  </DropdownItem>
                </DropdownMenu>
              )}
              {getConfig().themeNap && (
                <DropdownMenu right className="fdk-dropdownmenu">
                  <Link className="dropdown-item" to={PATHNAME_ABOUT_NAP}>
                    {localization.menu.aboutNap}
                  </Link>
                  <Link
                    className="dropdown-item"
                    to={PATHNAME_ABOUT_REGISTRATION}
                  >
                    {localization.menu.aboutRegistration}
                  </Link>
                  <DropdownItem onClick={() => props.onChangeLanguage('nb')}>
                    {localization.lang['norwegian-nb']}
                  </DropdownItem>
                  <DropdownItem onClick={() => props.onChangeLanguage('nn')}>
                    {localization.lang['norwegian-nn']}
                  </DropdownItem>
                  <DropdownItem onClick={() => props.onChangeLanguage('en')}>
                    {localization.lang['english-en']}
                  </DropdownItem>
                </DropdownMenu>
              )}
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

AppNavBar.defaultProps = {};

AppNavBar.propTypes = {
  onChangeLanguage: PropTypes.func.isRequired
};

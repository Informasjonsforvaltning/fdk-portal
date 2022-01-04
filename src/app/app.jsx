import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

import localization from '../lib/localization';

import ErrorPage from '../components/error-page';

import Header from '../components/header';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs.component';
import Footer from '../components/footer';
import { PATHNAME_MAIN_PAGE, PATHNAME_DATASETS } from '../constants/constants';
import ScrollToTop from '../components/scroll-to-top/scrollToTop.component';
import { getConfig } from '../config';
import '../assets/css/bootstrap-override.scss';
import { parseSearchParams } from '../lib/location-history-helper';
import routes from '../routes';
import lazyWithRetry from '../lib/lazyWithRetry';

export function App({ language, onChangeLanguage }) {
  useEffect(() => {
    const params = parseSearchParams(location);
    const { lang } = params;
    if (lang) {
      onChangeLanguage(lang);
    }
  }, []);

  // react-localization is a stateful library, so we set the required language on each full-app render
  // and full-render app each time when the language is changed
  localization.setLanguage(language);

  const themeClass = cx('position-relative overflow-hidden', {
    'theme-nap': getConfig().themeNap,
    'theme-fdk': !getConfig().themeNap
  });

  return (
    <div className={themeClass}>
      <Header onChangeLanguage={onChangeLanguage} />
      <Breadcrumbs />

      <Switch>
        <Redirect from='/:url*(/+)' to={location.pathname.slice(0, -1)} />

        {Object.keys(routes.main)
          .filter(path => !routes.main[path].scrollToTop)
          .map(path => {
            if (getConfig().themeNap && path === PATHNAME_MAIN_PAGE) {
              return <Redirect to={PATHNAME_DATASETS} />;
            }
            return (
              <Route
                exact={!!routes.main[path].exact}
                path={path}
                component={lazyWithRetry(() =>
                  import(
                    routes.main[path].page
                      ? `../pages/${routes.main[path].page}`
                      : `../components/${routes.main[path].component}`
                  )
                )}
              />
            );
          })}

        <ScrollToTop>
          <Switch>
            {Object.keys(routes.main)
              .filter(path => routes.main[path].scrollToTop)
              .map(path => (
                <Route
                  exact={!!routes.main[path].exact}
                  path={path}
                  component={lazyWithRetry(() =>
                    import(
                      routes.main[path].page
                        ? `../pages/${routes.main[path].page}`
                        : `../components/${routes.main[path].component}`
                    )
                  )}
                />
              ))}

            <Route render={() => <ErrorPage errorCode='404' />} />
          </Switch>
        </ScrollToTop>
      </Switch>

      <Footer />
    </div>
  );
}

App.propTypes = {
  language: PropTypes.string.isRequired,
  onChangeLanguage: PropTypes.func.isRequired
};

import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DocumentMeta from 'react-document-meta';
import Footer from '@fellesdatakatalog/external-footer';

import localization from '../lib/localization';
import { MainPage } from '../pages/main-page/main-page';
import { SearchPage } from '../pages/search-page/search-page';
import DatasetDetailsPage from '../components/dataset-details-page';
import DataServiceDetailsPage from '../components/data-service-details-page';
import ConceptDetailsPage from '../components/concept-details-page';
import InformationModelDetailsPage from '../components/information-model-details-page';
import PublicServiceDetailsPage from '../components/public-service-details-page';
import EventDetailsPage from '../components/event-details-page';
import { ConnectedConceptComparePage } from '../pages/concept-compare-page/connected-concept-compare-page';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs.component';
import { AppNavBar } from './app-nav-bar/app-nav-bar';
import { ReportPage } from '../pages/report-page/report-page';
import {
  PATHNAME_SEARCH,
  PATHNAME_DATASETS,
  PATHNAME_DATASET_DETAILS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS,
  PATHNAME_CONCEPTS_COMPARE,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_REPORTS,
  PATHNAME_ABOUT,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_MAIN_PAGE,
  PATHNAME_NEWS_ARTICLE,
  PATHNAME_NEWS_ARCHIVE,
  PATHNAME_GUIDANCE,
  PATHNAME_GUIDANCE_METADATA,
  PATHNAME_ORGANIZATIONS,
  PATHNAME_PUBLIC_SERVICES,
  PATHNAME_EVENTS
} from '../constants/constants';
import ScrollToTop from '../components/scroll-to-top/scrollToTop.component';
import { getConfig } from '../config';
import '../assets/css/bootstrap-override.scss';
import { NewsArticle } from '../pages/news-article-page/news-article-page';
import { NewsArchivePage } from '../pages/news-archive-page/news-archive-page';
import { CmsArticlePage } from '../pages/cms-article-page/cms-article-page';
import OrganizationsRouter from '../pages/organizations';
import { parseSearchParams } from '../lib/location-history-helper';

import ErrorPage from '../components/error-page';

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

  const footerText = !getConfig().themeNap
    ? localization.footer.information_text
    : localization.footer.information_textNap;

  const footerEmail = !getConfig().themeNap
    ? localization.footer.mail
    : localization.footer.mailNap;

  return (
    <div className={themeClass}>
      {getConfig().themeNap && <DocumentMeta {...{ title: 'NAP' }} />}
      <div>
        <a
          id='focus-element'
          className='uu-invisible'
          href={`${location.pathname}#content`}
          aria-hidden='true'
        >
          Hopp til hovedinnhold
        </a>
      </div>
      <div id='skip-link-wrap'>
        <a id='skip-link' href={`${location.pathname}#content`}>
          Hopp til hovedinnhold
        </a>
      </div>

      <AppNavBar onChangeLanguage={onChangeLanguage} />

      <Breadcrumbs />

      <Switch>
        <Redirect from='/:url*(/+)' to={location.pathname.slice(0, -1)} />
        <Route exact path={PATHNAME_MAIN_PAGE}>
          {getConfig().themeNap ? (
            <Redirect to={PATHNAME_DATASETS} />
          ) : (
            <MainPage />
          )}
        </Route>
        <Route exact path={PATHNAME_SEARCH} component={SearchPage} />
        <Route exact path={PATHNAME_DATASETS} component={SearchPage} />
        <Route exact path={PATHNAME_DATA_SERVICES} component={SearchPage} />
        <Route exact path={PATHNAME_CONCEPTS} component={SearchPage} />
        <Route exact path={PATHNAME_INFORMATIONMODELS} component={SearchPage} />
        <Route exact path={PATHNAME_PUBLIC_SERVICES} component={SearchPage} />
        <Route exact path={PATHNAME_NEWS_ARCHIVE} component={NewsArchivePage} />
        <Route path={PATHNAME_ORGANIZATIONS} component={OrganizationsRouter} />
        <ScrollToTop>
          <Switch>
            <Route
              exact
              path={`${PATHNAME_CONCEPTS}${PATHNAME_CONCEPTS_COMPARE}`}
              component={ConnectedConceptComparePage}
            />
            <Route
              exact
              path={`${PATHNAME_DATASET_DETAILS}/:datasetId`}
              component={DatasetDetailsPage}
            />
            <Route
              exact
              path={`${PATHNAME_CONCEPTS}/:conceptId`}
              component={ConceptDetailsPage}
            />
            <Route
              exact
              path={`${PATHNAME_INFORMATIONMODELS}/:informationModelId`}
              component={InformationModelDetailsPage}
            />
            <Route
              exact
              path={`${PATHNAME_DATA_SERVICES}/:dataServiceId`}
              component={DataServiceDetailsPage}
            />
            <Route
              exact
              path={`${PATHNAME_PUBLIC_SERVICES}/:publicServiceId`}
              component={PublicServiceDetailsPage}
            />
            <Route
              exact
              path={`${PATHNAME_EVENTS}/:eventId`}
              component={EventDetailsPage}
            />
            <Route
              exact
              path={`${PATHNAME_NEWS_ARTICLE}/:id`}
              component={NewsArticle}
            />
            <Route exact path={PATHNAME_REPORTS} component={ReportPage} />
            <Route exact path={PATHNAME_ABOUT} component={CmsArticlePage} />
            <Route
              exact
              path={PATHNAME_ABOUT_REGISTRATION}
              component={CmsArticlePage}
            />
            <Route exact path={PATHNAME_GUIDANCE} component={CmsArticlePage} />
            <Route
              exact
              path={PATHNAME_GUIDANCE_METADATA}
              component={CmsArticlePage}
            />
            <Route render={() => <ErrorPage errorCode='404' />} />
          </Switch>
        </ScrollToTop>
      </Switch>

      {!getConfig().themeNap ? (
        <Footer />
      ) : (
        <>
          <div className='fdk-footer d-md-none'>
            <div className='container'>
              <div className='row'>
                <div className='col-sm-12 text-center mb-2'>
                  <p className='fdk-p-footer'>{footerText}</p>
                </div>
                <div className='col-sm-12 text-center mb-2'>
                  <p className='fdk-p-footer'>
                    <a href='https://www.brreg.no/personvernerklaering/'>
                      {localization.footer.information}
                      {localization.footer.privacy}
                      <i className='fa fa-external-link fdk-fa-right' />
                    </a>
                  </p>
                </div>

                <div className='col-sm-12 text-center mb-2'>
                  <p className='fdk-p-footer'>
                    <a href={`mailto:${footerEmail}`}>{footerEmail}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='fdk-footer d-none d-md-block'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-3'>
                  <p className='fdk-p-footer'>
                    <a href='https://www.digdir.no/om-oss/personvernerklaering/706'>
                      {localization.footer.information}
                      <br />
                      {localization.footer.privacy}
                      <i className='fa fa-external-link fdk-fa-right' />
                    </a>
                  </p>
                </div>
                <div className='col-md-6 text-center'>
                  <span className='uu-invisible' aria-hidden='false'>
                    Felles Datakatalog.
                  </span>
                  <p className='fdk-p-footer'>{footerText}</p>
                </div>
                <div className='col-md-3 text-right'>
                  <p className='fdk-p-footer'>
                    <a href={`mailto:${footerEmail}`}>
                      <span className='uu-invisible' aria-hidden='false'>
                        Mailadresse.
                      </span>
                      {localization.footer.contact}
                      <br />
                      {footerEmail}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

App.propTypes = {
  language: PropTypes.string.isRequired,
  onChangeLanguage: PropTypes.func.isRequired
};

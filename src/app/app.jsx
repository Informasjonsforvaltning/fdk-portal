import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
import { ReportPage } from '../pages/report-page/report-page';
import ErrorPage from '../components/error-page';
import SparqlPage from '../components/sparql-page';
import Header from '../components/header';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs.component';
import Footer from '../components/footer';
import {
  PATHNAME_MAIN_PAGE,
  PATHNAME_SEARCH,
  PATHNAME_DATASETS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_PUBLIC_SERVICES,
  PATHNAME_PUBLIC_SERVICES_AND_EVENTS,
  PATHNAME_NEWS_ARCHIVE,
  PATHNAME_ORGANIZATIONS,
  PATHNAME_CONCEPTS_COMPARE,
  PATHNAME_DATASET_DETAILS,
  PATHNAME_EVENTS,
  PATHNAME_NEWS_ARTICLE,
  PATHNAME_NEWS_ARTICLE_V2,
  PATHNAME_REPORTS,
  PATHNAME_ABOUT,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_GUIDANCE,
  PATHNAME_GUIDANCE_METADATA,
  PATHNAME_SPARQL,
  PATHNAME_ABOUT_DATASETS,
  PATHNAME_ABOUT_DATA_SERVICES,
  PATHNAME_ABOUT_CONCEPTS,
  PATHNAME_ABOUT_INFORMATIONMODELS,
  PATHNAME_AI,
  PATHNAME_TRANSPORT
} from '../constants/constants';
import ScrollToTop from '../components/scroll-to-top';
import { getConfig } from '../config';
import '../assets/css/bootstrap-override.scss';
import { NewsArticle } from '../pages/news-article-page/news-article-page';
import { NewsArchivePage } from '../pages/news-archive-page/news-archive-page';
import { NewsArticlePageV2 } from '../pages/news-article-page-v2/news-article-page';
import { CmsArticlePage } from '../pages/cms-article-page/cms-article-page';
import OrganizationsRouter from '../pages/organizations';
import InformationPage from '../pages/cms-information-page';
import TransportPage from '../pages/cms-transport-page';
import { AiProjectPage } from '../pages/ai-project-page';
import { parseSearchParams } from '../lib/location-history-helper';
import routes from '../routes';

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

  const components = {
    [PATHNAME_MAIN_PAGE]: MainPage,
    [PATHNAME_SEARCH]: SearchPage,
    [PATHNAME_DATASETS]: SearchPage,
    [PATHNAME_DATA_SERVICES]: SearchPage,
    [PATHNAME_CONCEPTS]: SearchPage,
    [PATHNAME_INFORMATIONMODELS]: SearchPage,
    [PATHNAME_PUBLIC_SERVICES_AND_EVENTS]: SearchPage,
    [PATHNAME_NEWS_ARCHIVE]: NewsArchivePage,
    [`${PATHNAME_CONCEPTS}${PATHNAME_CONCEPTS_COMPARE}`]:
      ConnectedConceptComparePage,
    [`${PATHNAME_DATASET_DETAILS}/:datasetId`]: DatasetDetailsPage,
    [`${PATHNAME_CONCEPTS}/:conceptId`]: ConceptDetailsPage,
    [`${PATHNAME_INFORMATIONMODELS}/:informationModelId`]:
      InformationModelDetailsPage,
    [`${PATHNAME_DATA_SERVICES}/:dataServiceId`]: DataServiceDetailsPage,
    [`${PATHNAME_PUBLIC_SERVICES}/:publicServiceId`]: PublicServiceDetailsPage,
    [`${PATHNAME_PUBLIC_SERVICES_AND_EVENTS}/:publicServiceId`]:
      PublicServiceDetailsPage,
    [`${PATHNAME_EVENTS}/:eventId`]: EventDetailsPage,
    [`${PATHNAME_NEWS_ARTICLE}/:id`]: NewsArticle,
    [`${PATHNAME_NEWS_ARTICLE_V2}/:id`]: NewsArticlePageV2,
    [PATHNAME_REPORTS]: ReportPage,
    [PATHNAME_ABOUT]: CmsArticlePage,
    [PATHNAME_ABOUT_REGISTRATION]: CmsArticlePage,
    [PATHNAME_GUIDANCE]: CmsArticlePage,
    [PATHNAME_GUIDANCE_METADATA]: CmsArticlePage,
    [PATHNAME_ORGANIZATIONS]: OrganizationsRouter,
    [PATHNAME_ABOUT_DATASETS]: InformationPage,
    [PATHNAME_ABOUT_DATA_SERVICES]: InformationPage,
    [PATHNAME_ABOUT_CONCEPTS]: InformationPage,
    [PATHNAME_ABOUT_INFORMATIONMODELS]: InformationPage,
    [PATHNAME_AI]: AiProjectPage,
    [PATHNAME_TRANSPORT]: TransportPage
  };

  return (
    <div className={themeClass}>
      <Helmet>
        <html lang={language} />
        <title>
          {getConfig().themeNap ? 'Transportportal' : localization.head.title}
        </title>

        <meta name='description' content={localization.head.description} />
        <meta
          property='og:title'
          content={
            getConfig().themeNap ? 'Transportportal' : localization.head.title
          }
        />
        <meta
          property='og:description'
          content={localization.head.description}
        />
      </Helmet>
      <Header onChangeLanguage={onChangeLanguage} />
      <Breadcrumbs />

      <Switch key='route-switch-1'>
        <Redirect from='/:url*(/+)' to={location.pathname.slice(0, -1)} />

        {routes.main
          .filter(path =>
            [
              PATHNAME_MAIN_PAGE,
              PATHNAME_SEARCH,
              PATHNAME_DATASETS,
              PATHNAME_DATA_SERVICES,
              PATHNAME_CONCEPTS,
              PATHNAME_INFORMATIONMODELS,
              PATHNAME_PUBLIC_SERVICES_AND_EVENTS,
              PATHNAME_NEWS_ARCHIVE,
              PATHNAME_ORGANIZATIONS
            ].includes(path)
          )
          .map(path => {
            if (getConfig().themeNap && path === PATHNAME_MAIN_PAGE) {
              return (
                <Route exact path={PATHNAME_MAIN_PAGE}>
                  <Redirect to={PATHNAME_DATASETS} />;
                </Route>
              );
            }
            return (
              <Route
                exact={path !== PATHNAME_ORGANIZATIONS}
                path={path}
                component={components[path]}
              />
            );
          })}

        <ScrollToTop key='route-switch-2'>
          {routes.main
            .filter(
              path =>
                ![
                  PATHNAME_MAIN_PAGE,
                  PATHNAME_SEARCH,
                  PATHNAME_DATASETS,
                  PATHNAME_DATA_SERVICES,
                  PATHNAME_CONCEPTS,
                  PATHNAME_INFORMATIONMODELS,
                  PATHNAME_PUBLIC_SERVICES_AND_EVENTS,
                  PATHNAME_NEWS_ARCHIVE,
                  PATHNAME_ORGANIZATIONS
                ].includes(path)
            )
            .map(path =>
              path === PATHNAME_SPARQL ? (
                <Route
                  exact
                  path={PATHNAME_SPARQL}
                  render={() => <SparqlPage language={language} />}
                />
              ) : (
                <Route exact path={path} component={components[path]} />
              )
            )}

          <Route render={() => <ErrorPage errorCode='404' />} />
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

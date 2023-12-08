import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import cx from 'classnames';
import localization from '../lib/localization';
import { MainPage } from '../pages/main-page/main-page';
import { SearchPage } from '../pages/search-page/search-page';
import DatasetDetailsPage from '../pages/dataset-details-page';
import DataServiceDetailsPage from '../pages/data-service-details-page';
import ConceptDetailsPage from '../pages/concept-details-page';
import InformationModelDetailsPage from '../pages/information-model-details-page';
import PublicServiceDetailsPage from '../pages/public-service-details-page';
import EventDetailsPage from '../pages/event-details-page';
import { ConnectedConceptComparePage } from '../pages/concept-compare-page/connected-concept-compare-page';
import { ReportPage } from '../pages/report-page/report-page';
import ErrorPage from '../pages/error-page';
import SparqlPage from '../pages/sparql-page';
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
  PATHNAME_FANCY_ARTICLE_V2,
  PATHNAME_REPORTS,
  PATHNAME_ABOUT,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_ABOUT_DATASETS,
  PATHNAME_ABOUT_DATA_SERVICES,
  PATHNAME_ABOUT_CONCEPTS,
  PATHNAME_ABOUT_INFORMATIONMODELS,
  PATHNAME_GUIDANCE,
  PATHNAME_GUIDANCE_METADATA,
  PATHNAME_SPARQL,
  PATHNAME_AI,
  PATHNAME_REQUESTS,
  PATHNAME_TRANSPORT_GENERAL,
  PATHNAME_TRANSPORT_GENERAL_INFO_ABOUT_THE_PORTAL,
  PATHNAME_TRANSPORT_GENERAL_ITS,
  PATHNAME_TRANSPORT_GENERAL_ROLES,
  PATHNAME_TRANSPORT_USERS_NEWS,
  PATHNAME_TRANSPORT_USERS_DATA_IN_NAP,
  PATHNAME_TRANSPORT_USERS_WHAT,
  PATHNAME_TRANSPORT_USERS_WHERE,
  PATHNAME_TRANSPORT_PROVIDERS_ADD,
  PATHNAME_TRANSPORT_PROVIDERS_COMPLIANCE,
  PATHNAME_ABOUT_HARVESTING
} from '../constants/constants';
import ScrollToTop from '../components/scroll-to-top';
import { getConfig } from '../config';
import '../assets/css/bootstrap-override.scss';
import { NewsArticle } from '../pages/news-article-page/news-article-page';
import { NewsArchivePage } from '../pages/news-archive-page/news-archive-page';
import { NewsArticlePageV2 } from '../pages/news-article-page-v2/news-article-page';
import { FancyArticlePageV2 } from '../pages/fancy-article-page-v2/fancy-article-page';
import OrganizationsRouter from '../pages/organizations';
import InformationPage from '../pages/cms-information-page';
import TransportPage from '../pages/cms-transport-page';
import { AiProjectPage } from '../pages/ai-project-page';
import RequestsPage from '../pages/requests';
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
    [`${PATHNAME_FANCY_ARTICLE_V2}/:id`]: FancyArticlePageV2,
    [PATHNAME_REPORTS]: ReportPage,
    [PATHNAME_ABOUT]: InformationPage,
    [PATHNAME_ABOUT_REGISTRATION]: InformationPage,
    [PATHNAME_GUIDANCE]: InformationPage,
    [PATHNAME_GUIDANCE_METADATA]: InformationPage,
    [PATHNAME_ORGANIZATIONS]: OrganizationsRouter,
    [PATHNAME_ABOUT_DATASETS]: InformationPage,
    [PATHNAME_ABOUT_DATA_SERVICES]: InformationPage,
    [PATHNAME_ABOUT_CONCEPTS]: InformationPage,
    [PATHNAME_ABOUT_INFORMATIONMODELS]: InformationPage,
    [PATHNAME_ABOUT_HARVESTING]: InformationPage,
    [PATHNAME_AI]: AiProjectPage,
    [PATHNAME_REQUESTS]: RequestsPage,
    [PATHNAME_TRANSPORT_GENERAL]: TransportPage,
    [PATHNAME_TRANSPORT_GENERAL_INFO_ABOUT_THE_PORTAL]: TransportPage,
    [PATHNAME_TRANSPORT_GENERAL_ITS]: TransportPage,
    [PATHNAME_TRANSPORT_GENERAL_ROLES]: TransportPage,
    [PATHNAME_TRANSPORT_USERS_NEWS]: TransportPage,
    [PATHNAME_TRANSPORT_USERS_DATA_IN_NAP]: TransportPage,
    [PATHNAME_TRANSPORT_USERS_WHAT]: TransportPage,
    [PATHNAME_TRANSPORT_USERS_WHERE]: TransportPage,
    [PATHNAME_TRANSPORT_PROVIDERS_ADD]: TransportPage,
    [PATHNAME_TRANSPORT_PROVIDERS_COMPLIANCE]: TransportPage
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

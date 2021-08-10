import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
  PATHNAME_NEWS_ARTICLE_V2,
  PATHNAME_NEWS_ARCHIVE,
  PATHNAME_GUIDANCE,
  PATHNAME_GUIDANCE_METADATA,
  PATHNAME_ORGANIZATIONS,
  PATHNAME_PUBLIC_SERVICES,
  PATHNAME_EVENTS,
  PATHNAME_SPARQL
} from '../constants/constants';
import ScrollToTop from '../components/scroll-to-top/scrollToTop.component';
import { getConfig } from '../config';
import '../assets/css/bootstrap-override.scss';
import { NewsArticle } from '../pages/news-article-page/news-article-page';
import { NewsArchivePage } from '../pages/news-archive-page/news-archive-page';
import { CmsArticlePage } from '../pages/cms-article-page/cms-article-page';
import OrganizationsRouter from '../pages/organizations';
import { parseSearchParams } from '../lib/location-history-helper';
import { NewsArticlePageV2 } from '../pages/news-article-page-v2/news-article-page';

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
            <Route
              exact
              path={`${PATHNAME_NEWS_ARTICLE_V2}/:id`}
              component={NewsArticlePageV2}
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
            <Route
              exact
              path={PATHNAME_SPARQL}
              render={() => <SparqlPage language={language} />}
            />
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

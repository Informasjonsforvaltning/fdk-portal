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
  PATHNAME_SPARQL,
  PATHNAME_PUBLISHING
} from './constants/constants';

const routes: any = {
  main: {
    [PATHNAME_MAIN_PAGE]: { page: 'main-page/main-page' },
    [PATHNAME_SEARCH]: { page: 'search-page/search-page' },
    [PATHNAME_DATASETS]: { page: 'search-page/search-page' },
    [PATHNAME_DATA_SERVICES]: { page: 'search-page/search-page' },
    [PATHNAME_CONCEPTS]: { page: 'search-page/search-page' },
    [PATHNAME_INFORMATIONMODELS]: { page: 'search-page/search-page' },
    [PATHNAME_PUBLIC_SERVICES]: { page: 'search-page/search-page' },
    [PATHNAME_NEWS_ARCHIVE]: { page: 'news-archive-page/news-archive-page' },
    [PATHNAME_ORGANIZATIONS]: { page: 'organizations', exact: false },
    [`${PATHNAME_CONCEPTS}${PATHNAME_CONCEPTS_COMPARE}`]: {
      page: 'concept-compare-page/connected-concept-compare-page',
      scrollToTop: true
    },
    [`${PATHNAME_DATASET_DETAILS}/:datasetId`]: {
      page: 'dataset-details-page',
      scrollToTop: true
    },
    [`${PATHNAME_CONCEPTS}/:conceptId`]: {
      page: 'concept-details-page',
      scrollToTop: true
    },
    [`${PATHNAME_INFORMATIONMODELS}/:informationModelId`]: {
      page: 'information-model-details-page',
      scrollToTop: true
    },
    [`${PATHNAME_DATA_SERVICES}/:dataServiceId`]: {
      page: 'data-service-details-page',
      scrollToTop: true
    },
    [`${PATHNAME_PUBLIC_SERVICES}/:publicServiceId`]: {
      page: 'public-service-details-page',
      scrollToTop: true
    },
    [`${PATHNAME_EVENTS}/:eventId`]: {
      page: 'event-details-page',
      scrollToTop: true
    },
    [`${PATHNAME_NEWS_ARTICLE}/:id`]: {
      page: 'news-article-page/news-article-page',
      scrollToTop: true
    },
    [`${PATHNAME_NEWS_ARTICLE_V2}/:id`]: {
      page: 'news-article-page-v2/news-article-page',
      scrollToTop: true
    },
    [PATHNAME_REPORTS]: { page: 'report-page/report-page', scrollToTop: true },
    [PATHNAME_ABOUT]: {
      page: 'cms-article-page/cms-article-page',
      scrollToTop: true
    },
    [PATHNAME_ABOUT_REGISTRATION]: {
      page: 'cms-article-page/cms-article-page',
      scrollToTop: true
    },
    [PATHNAME_GUIDANCE]: {
      page: 'cms-article-page/cms-article-page',
      scrollToTop: true
    },
    [PATHNAME_GUIDANCE_METADATA]: {
      page: 'cms-article-page/cms-article-page',
      scrollToTop: true
    },
    [PATHNAME_SPARQL]: { component: 'sparql-page', scrollToTop: true }
  },
  publishing: {
    [PATHNAME_PUBLISHING]: { page: 'publishing-page' },
    [`${PATHNAME_PUBLISHING}/about-registration`]: {
      page: 'about-registration-page'
    },
    [`${PATHNAME_PUBLISHING}/about-harvesting`]: {
      page: 'about-harvesting-page'
    },
    [`${PATHNAME_PUBLISHING}/terms-of-use`]: { page: 'terms-of-use-page' },
    [`${PATHNAME_PUBLISHING}/service-messages`]: {
      page: 'service-messages-page'
    },
    [`${PATHNAME_PUBLISHING}/service-messages/:id`]: {
      page: 'service-messages-page'
    }
  },
  organizations: {
    [PATHNAME_ORGANIZATIONS]: { page: 'organizations-page' },
    [`${PATHNAME_ORGANIZATIONS}/:organizationId`]: {
      page: 'organization-page'
    },
    [`${PATHNAME_ORGANIZATIONS}/:organizationId/datasets`]: {
      page: 'datasets-page'
    },
    [`${PATHNAME_ORGANIZATIONS}/:organizationId/datasets/:datasetId`]: {
      page: 'dataset-page'
    }
  }
};

export default routes;

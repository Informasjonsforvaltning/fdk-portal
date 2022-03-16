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
  PATHNAME_PUBLIC_SERVICES_AND_EVENTS,
  PATHNAME_EVENTS,
  PATHNAME_SPARQL,
  PATHNAME_PUBLISHING
} from './constants/constants';

const routes: any = {
  main: [
    PATHNAME_MAIN_PAGE,
    PATHNAME_SEARCH,
    PATHNAME_DATASETS,
    PATHNAME_DATA_SERVICES,
    PATHNAME_CONCEPTS,
    PATHNAME_INFORMATIONMODELS,
    PATHNAME_PUBLIC_SERVICES_AND_EVENTS,
    PATHNAME_NEWS_ARCHIVE,
    PATHNAME_ORGANIZATIONS,
    `${PATHNAME_CONCEPTS}${PATHNAME_CONCEPTS_COMPARE}`,
    `${PATHNAME_DATASET_DETAILS}/:datasetId`,
    `${PATHNAME_CONCEPTS}/:conceptId`,
    `${PATHNAME_INFORMATIONMODELS}/:informationModelId`,
    `${PATHNAME_DATA_SERVICES}/:dataServiceId`,
    `${PATHNAME_PUBLIC_SERVICES_AND_EVENTS}/:publicServiceId`,
    `${PATHNAME_PUBLIC_SERVICES}/:publicServiceId`,
    `${PATHNAME_EVENTS}/:eventId`,
    `${PATHNAME_NEWS_ARTICLE}/:id`,
    `${PATHNAME_NEWS_ARTICLE_V2}/:id`,
    PATHNAME_REPORTS,
    PATHNAME_ABOUT,
    PATHNAME_ABOUT_REGISTRATION,
    PATHNAME_GUIDANCE,
    PATHNAME_GUIDANCE_METADATA,
    PATHNAME_SPARQL
  ],
  publishing: [
    PATHNAME_PUBLISHING,
    `${PATHNAME_PUBLISHING}/about-registration`,
    `${PATHNAME_PUBLISHING}/about-harvesting`,
    `${PATHNAME_PUBLISHING}/terms-of-use`,
    `${PATHNAME_PUBLISHING}/service-messages`,
    `${PATHNAME_PUBLISHING}/service-messages/:id`
  ],

  organizations: [
    PATHNAME_ORGANIZATIONS,
    `${PATHNAME_ORGANIZATIONS}/:organizationId`,
    `${PATHNAME_ORGANIZATIONS}/:organizationId/datasets`,
    `${PATHNAME_ORGANIZATIONS}/:organizationId/datasets/:datasetId`
  ]
};

export default routes;

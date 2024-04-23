import { isNapProfile } from './lib/nap-profile';

const env = window.env || {
  FDK_PORTAL_BASE_URI: 'http://localhost:8080',
  FDK_CMS_BASE_URI: 'https://cms.fellesdatakatalog.digdir.no',
  USE_DEMO_LOGO: true
};

// override all env variables to staging (inspired by https://www.staging.fellesdatakatalog.digdir.no/config.js)
// env.FDK_PORTAL_BASE_URI = 'https://staging.fellesdatakatalog.digdir.no';
// env.SEARCH_SERVICE_HOST =
//   'https://search.api.staging.fellesdatakatalog.digdir.no';
// env.CMS_API_HOST = 'https://cms-fellesdatakatalog.digdir.no';
// env.FDK_CMS_BASE_URI = 'https://cms.staging.fellesdatakatalog.digdir.no';
// env.ORGANIZATION_HOST =
//   'https://organization-bff.staging.fellesdatakatalog.digdir.no';
// env.ORGANIZATION_CATALOG_URI =
//   'https://organization-catalog.staging.fellesdatakatalog.digdir.no';
// env.REPORT_API_HOST = 'https://reports-bff.staging.fellesdatakatalog.digdir.no';
// env.RESOURCE_API_HOST =
//   'https://resource.api.staging.fellesdatakatalog.digdir.no';
// env.FDK_MQA_API_BASE_URI =
//   'https://mqa-scoring-api.staging.fellesdatakatalog.digdir.no';
// env.USE_DEMO_LOGO = true;

const fdkPortalBaseUri = {
  host: env.FDK_PORTAL_BASE_URI || ''
};

const defaultToFdkPortalBaseUri = host => (host ? { host } : fdkPortalBaseUri);

const config = {
  apiApi: defaultToFdkPortalBaseUri(env.API_API_HOST),
  catalogApi: defaultToFdkPortalBaseUri(env.CATALOG_API_HOST),
  cmsApi: { host: env.CMS_API_HOST },
  cmsV2Api: { host: env.FDK_CMS_BASE_URI },
  conceptApi: defaultToFdkPortalBaseUri(env.CONCEPT_API_HOST),
  datasetApi: defaultToFdkPortalBaseUri(env.DATASET_API_HOST),
  fdkPortalBaseUri: defaultToFdkPortalBaseUri(),
  filterTransportDatasets: isNapProfile(env.NAP_HOST),
  informationmodelApi: defaultToFdkPortalBaseUri(env.INFORMATIONMODEL_API_HOST),
  metadataQualityAssessmentApi: {
    host: env.FDK_MQA_API_BASE_URI
  },
  organizationsApi: { host: env.ORGANIZATION_HOST },
  organizationsCatalogApi: { host: env.ORGANIZATION_CATALOG_URI },
  publisherApi: defaultToFdkPortalBaseUri(env.PUBLISHER_API_HOST),
  referenceDataApi: defaultToFdkPortalBaseUri(env.REFERENCE_DATA_HOST),
  reportApi: { host: env.REPORT_API_HOST },
  resourceApi: { host: env.RESOURCE_API_HOST },
  searchApi: { host: env.SEARCH_SERVICE_HOST },
  store: { useLogger: env.REDUX_LOG === 'true' },
  themeNap: isNapProfile(env.NAP_HOST),
  useDemoLogo: env.USE_DEMO_LOGO
};

export const getConfig = () => config;

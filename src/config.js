import { isNapProfile } from './lib/nap-profile';

const env = window.env || {
  SEARCH_API_HOST: 'http://localhost:8080',
  FDK_CMS_BASE_URI: 'https://cms.fellesdatakatalog.digdir.no',
  USE_DEMO_LOGO: true
};

// override all env variables to staging (inspired by https://www.staging.fellesdatakatalog.digdir.no/config.js)
// env.SEARCH_API_HOST = 'https://www.staging.fellesdatakatalog.digdir.no';
// env.SEARCH_HOST = 'https://www.staging.fellesdatakatalog.digdir.no';
// env.SEARCH_FULLTEXT_HOST = 'https://search.staging.fellesdatakatalog.digdir.no';
// env.CMS_API_HOST = 'https://cms-fellesdatakatalog.digdir.no';
// env.ORGANIZATION_HOST =
//   'https://organization-bff.staging.fellesdatakatalog.digdir.no';
// env.ORGANIZATION_CATALOG_URI =
//   'https://organization-catalog.staging.fellesdatakatalog.digdir.no';
// env.REPORT_API_HOST = 'https://reports-bff.staging.fellesdatakatalog.digdir.no';
// env.FDK_MQA_API_BASE_URI =
//   'https://metadata-quality.staging.fellesdatakatalog.digdir.no';
// env.USE_DEMO_LOGO = true;

const searchApi = {
  host: env.SEARCH_API_HOST || '',
  // in ut1 and st1, search api requires basic authentication
  config: env.SEARCH_API_AUTHORIZATION
    ? { headers: { authorization: env.SEARCH_API_AUTHORIZATION } }
    : undefined
};

const defaultToSearchApi = host => (host ? { host } : searchApi);

const config = {
  store: { useLogger: env.REDUX_LOG === 'true' },
  filterTransportDatasets: isNapProfile(env.NAP_HOST),
  themeNap: isNapProfile(env.NAP_HOST),
  datasetApi: defaultToSearchApi(env.DATASET_API_HOST),
  apiApi: defaultToSearchApi(env.API_API_HOST),
  conceptApi: defaultToSearchApi(env.CONCEPT_API_HOST),
  informationmodelApi: defaultToSearchApi(env.INFORMATIONMODEL_API_HOST),
  publisherApi: defaultToSearchApi(env.PUBLISHER_API_HOST),
  catalogApi: defaultToSearchApi(env.CATALOG_API_HOST),
  referenceDataApi: defaultToSearchApi(env.REFERENCE_DATA_HOST),
  searchHost: defaultToSearchApi(env.SEARCH_HOST),
  useDemoLogo: env.USE_DEMO_LOGO,
  searchFullTextApi: { host: env.SEARCH_FULLTEXT_HOST },
  cmsApi: { host: env.CMS_API_HOST },
  cmsV2Api: { host: env.FDK_CMS_BASE_URI },
  organizationsApi: { host: env.ORGANIZATION_HOST },
  organizationsCatalogApi: { host: env.ORGANIZATION_CATALOG_URI },
  reportApi: { host: env.REPORT_API_HOST },
  metadataQualityAssessmentApi: {
    host: env.FDK_MQA_API_BASE_URI
  }
};

export const getConfig = () => config;

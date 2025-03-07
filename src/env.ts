import { validateEnv } from './utils/common';

import { Namespace } from './types/enums';

export default validateEnv(
  (window as any).env ?? {
    NAMESPACE: Namespace.DEVELOPMENT,
    OIDC_ISSUER:
      'https://sso.staging.fellesdatakatalog.digdir.no/auth/realms/fdk',
    OIDC_CLIENT_SECRET: '',
    CONTAINER_IMAGE: 'eu.gcr.io/digdir-fdk-infra/fdk-portal:development',
    FDK_PORTAL_BASE_URI: 'https://staging.fellesdatakatalog.digdir.no',
    FDK_REGISTRATION_BASE_URI:
      'https://registrering.staging.fellesdatakatalog.digdir.no',
    ADMIN_GUI_BASE_URI: 'https://admin.staging.fellesdatakatalog.digdir.no',
    FDK_LOGGING_FUNCTION_URI:
      'https://europe-west1-digdir-cloud-functions.cloudfunctions.net/cloud-logging',
    FDK_COMMUNITY_BASE_URI:
      'https://community.staging.fellesdatakatalog.digdir.no',
    FDK_CMS_BASE_URI: 'https://cms.fellesdatakatalog.digdir.no',
    FDK_SPARQL_API_BASE_URI:
      'https://sparql.staging.fellesdatakatalog.digdir.no',
    FDK_DATASET_PREVIEW_API_KEY: '',
    FDK_USER_FEEDBACK_SERVICE_BASE_URI:
      'https://europe-west1-digdir-cloud-functions.cloudfunctions.net/user-feedback-service-staging',
    AI_PROJECT_SERVICE_BASE_URI:
      'https://ai-project.staging.fellesdatakatalog.digdir.no',
    RESOURCE_API_HOST:
      'https://resource.api.staging.fellesdatakatalog.digdir.no',
    INFORMATIONMODEL_HARVESTER_HOST:
      'https://informationmodels.staging.fellesdatakatalog.digdir.no',
    CATALOG_PORTAL_BASE_URI:
      'https://catalog-portal.staging.fellesdatakatalog.digdir.no',
    ACCESS_REQUEST_API_HOST:
      'https://access-request.api.staging.fellesdatakatalog.digdir.no'
  }
);

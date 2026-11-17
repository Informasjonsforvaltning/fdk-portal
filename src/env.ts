import { validateEnv } from './utils/common';

import { Namespace } from './types/enums';

export default validateEnv(
  (window as any).env ?? {
    NAMESPACE: Namespace.DEVELOPMENT,
    OIDC_ISSUER: 'https://auth.staging.fellesdatakatalog.digdir.no/realms/fdk',
    OIDC_CLIENT_SECRET: '',
    CONTAINER_IMAGE: 'eu.gcr.io/digdir-fdk-infra/fdk-portal:development',
    FDK_PORTAL_BASE_URI: 'https://staging.fellesdatakatalog.digdir.no',
    FDK_REGISTRATION_BASE_URI:
      'https://registrering.staging.fellesdatakatalog.digdir.no',
    ADMIN_GUI_BASE_URI: 'https://admin.staging.fellesdatakatalog.digdir.no',
    FDK_LOGGING_FUNCTION_URI:
      'https://europe-north1-digdir-cloud-functions.cloudfunctions.net/cloud-logging-dev',
    FDK_COMMUNITY_BASE_URI:
      'https://community.staging.fellesdatakatalog.digdir.no',
    FDK_CMS_BASE_URI: 'https://cms.fellesdatakatalog.digdir.no',
    FDK_DATASET_PREVIEW_API_KEY: '',
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

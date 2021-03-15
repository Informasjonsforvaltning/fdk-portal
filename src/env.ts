import { validateEnv } from './utils/common';

import { Namespace } from './types/enums';

export default validateEnv(
  (window as any).env ?? {
    NAMESPACE: Namespace.DEVELOPMENT,
    CONTAINER_IMAGE: 'eu.gcr.io/digdir-fdk-infra/fdk-portal:development',
    SEARCH_API_HOST: 'https://www.staging.fellesdatakatalog.digdir.no',
    FDK_REGISTRATION_BASE_URI:
      'https://registrering.staging.fellesdatakatalog.digdir.no',
    ADMIN_GUI_BASE_URI: 'https://admin.staging.fellesdatakatalog.digdir.no',
    INFORMATIONMODEL_HARVESTER_HOST:
      'https://informationmodels.staging.fellesdatakatalog.digdir.no',
    FDK_LOGGING_FUNCTION_URI:
      'https://europe-west1-digdir-cloud-functions.cloudfunctions.net/cloud-logging'
  }
);

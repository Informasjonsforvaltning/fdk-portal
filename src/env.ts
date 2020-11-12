import { validateEnv } from './utils/common';

import { Environment } from './types/enums';

export default validateEnv(
  (window as any).env ?? {
    ENV: Environment.DEVELOPMENT,
    SEARCH_API_HOST: 'https://www.staging.fellesdatakatalog.digdir.no',
    FDK_REGISTRATION_BASE_URI:
      'https://registrering.staging.fellesdatakatalog.digdir.no',
    ADMIN_GUI_BASE_URI: 'https://admin.staging.fellesdatakatalog.digdir.no',
    INFORMATIONMODEL_HARVESTER_HOST:
      'https://informationmodels.staging.fellesdatakatalog.digdir.no'
  }
);

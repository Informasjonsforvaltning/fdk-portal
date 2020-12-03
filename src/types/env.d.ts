import { Environment } from './enums';

export interface EnvironmentVariables {
  ENV: Environment;
  SEARCH_API_HOST: string;
  FDK_REGISTRATION_BASE_URI: string;
  ADMIN_GUI_BASE_URI: string;
  INFORMATIONMODEL_HARVESTER_HOST: string;
}

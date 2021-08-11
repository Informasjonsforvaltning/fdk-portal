import { Namespace } from './enums';

export interface EnvironmentVariables {
  NAMESPACE: Namespace;
  CONTAINER_IMAGE: string;
  SEARCH_API_HOST: string;
  FDK_REGISTRATION_BASE_URI: string;
  ADMIN_GUI_BASE_URI: string;
  INFORMATIONMODEL_HARVESTER_HOST: string;
  FDK_LOGGING_FUNCTION_URI: string;
  FDK_COMMUNITY_BASE_URI: string;
  FDK_SPARQL_API_BASE_URI: string;
}

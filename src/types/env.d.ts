import { Namespace } from './enums';

export interface EnvironmentVariables {
  NAMESPACE: Namespace;
  OIDC_ISSUER: string;
  OIDC_CLIENT_SECRET: string;
  CONTAINER_IMAGE: string;
  FDK_PORTAL_BASE_URI: string;
  FDK_REGISTRATION_BASE_URI: string;
  ADMIN_GUI_BASE_URI: string;
  FDK_LOGGING_FUNCTION_URI: string;
  FDK_COMMUNITY_BASE_URI: string;
  FDK_SPARQL_API_BASE_URI: string;
  FDK_DATASET_PREVIEW_API_KEY: string;
  FDK_USER_FEEDBACK_SERVICE_BASE_URI: string;
  FDK_CMS_BASE_URI: string;
  AI_PROJECT_SERVICE_BASE_URI: string;
  RESOURCE_API_HOST: string;
  INFORMATIONMODEL_HARVESTER_HOST: string;
  CATALOG_PORTAL_BASE_URI: string;
  ACCESS_REQUEST_API_HOST: string;
}

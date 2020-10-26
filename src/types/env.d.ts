import { Environment } from './enums';

export interface EnvironmentVariables {
  ENV: Environment;
  FDK_REGISTRATION_BASE_URI: string;
  ADMIN_GUI_BASE_URI: string;
}

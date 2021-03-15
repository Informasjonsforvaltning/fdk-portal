import { Severity } from './enums';

export interface LogEntry {
  message?: string;
  severity?: Severity;
  namespace?: string;
  trace?: string;
  name?: string;
  location?: string;
  application?: string;
  image?: string;
}

import axios from 'axios';

import env from '../../env';
import type { LogEntry } from './types';

const { FDK_LOGGING_FUNCTION_URI, CONTAINER_IMAGE, NAMESPACE: namespace } = env;

class LoggingService {
  private image = CONTAINER_IMAGE.slice(
    CONTAINER_IMAGE.lastIndexOf(':') + 1,
    CONTAINER_IMAGE.length
  );

  private application = CONTAINER_IMAGE.slice(
    CONTAINER_IMAGE.lastIndexOf('/') + 1,
    CONTAINER_IMAGE.lastIndexOf(':')
  );

  public postLogEntry({ message, severity, trace, name }: LogEntry) {
    const { application, image } = this;
    axios
      .post(FDK_LOGGING_FUNCTION_URI, {
        message,
        severity,
        trace,
        name,
        namespace,
        application,
        image,
        location: location.href
      })
      .catch(() => {});
  }
}

export default new LoggingService();
export { Severity } from './enums';

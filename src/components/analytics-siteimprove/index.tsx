import { FC, useEffect, useState } from 'react';

import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  hasStatisticsConsent
} from '../../lib/consent';

const SCRIPT_SRC = 'https://siteimproveanalytics.com/js/siteanalyze_6255470.js';

const AnalyticsSiteImprove: FC = () => {
  const [consented, setConsented] = useState(false);

  // Track the shared statistics consent. The custom event covers same-document changes
  // (from the banner), and the storage event covers changes in other tabs/apps.
  useEffect(() => {
    const update = () => setConsented(hasStatisticsConsent());
    update();

    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY || event.key === null) {
        update();
      }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener(CONSENT_CHANGE_EVENT, update);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(CONSENT_CHANGE_EVENT, update);
    };
  }, []);

  // Load Siteimprove only while statistics consent is granted.
  useEffect(() => {
    if (!consented) {
      return undefined;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [consented]);

  return null;
};

export default AnalyticsSiteImprove;

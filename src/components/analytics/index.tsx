import { FC, memo, useEffect } from 'react';
import { compose } from 'redux';
import ReactGA from 'react-ga';
import GoogleTagManager from 'react-gtm-module';

import {
  GoogleAnalyticsTrackingId,
  GoogleTagManagerId
} from '../../types/enums';

const Analytics: FC = () => {
  const { hostname, pathname, search } = location;

  const isFellesDatakatalog = [
    'data.norge.no',
    'fellesdatakatalog.digdir.no'
  ].includes(hostname);
  const isTransportPortal = ['data.transportportal.no'].includes(hostname);
  const isLocalhost = ['localhost'].includes(hostname);

  const configureAnalytics = () => {
    if (isFellesDatakatalog) {
      ReactGA.initialize(GoogleAnalyticsTrackingId.FELLESDATAKATALOG);
    }

    if (isTransportPortal) {
      ReactGA.initialize(GoogleAnalyticsTrackingId.TRANSPORTPORTAL);
      GoogleTagManager.initialize({
        gtmId: GoogleTagManagerId.SVV
      });
    }

    if (isLocalhost) {
      ReactGA.initialize(GoogleAnalyticsTrackingId.LOCALHOST);
    }

    ReactGA.set({ anonymizeIp: true });
  };

  const registerPageView = () => {
    if (isFellesDatakatalog || isTransportPortal || isLocalhost) {
      const page = `${pathname}${search}`;

      ReactGA.set({ page });
      ReactGA.pageview(page, undefined, document.title);
    }
  };

  useEffect(() => {
    configureAnalytics();
    setTimeout(registerPageView, 1000);
  }, []);

  return null;
};

export default compose<FC>(memo)(Analytics);

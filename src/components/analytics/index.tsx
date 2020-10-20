import { FC, memo, useEffect } from 'react';
import { compose } from 'redux';
import ReactGA from 'react-ga';

import { GoogleAnalyticsTrackingId } from '../../types/enums';

const Analytics: FC = () => {
  const { hostname, pathname, search } = location;

  const isFellesDatakatalog = [
    'data.norge.no',
    'fellesdatakatalog.digdir.no'
  ].includes(hostname);
  const isTransportPortal = ['data.transportportal.no'].includes(hostname);
  const isLocalhost = ['localhost'].includes(hostname);

  const configureAnalytics = () => {
    ReactGA.set({ anonymizeIp: true });

    if (isFellesDatakatalog) {
      ReactGA.initialize(GoogleAnalyticsTrackingId.FELLESDATAKATALOG);
    }

    if (isTransportPortal) {
      ReactGA.initialize(GoogleAnalyticsTrackingId.TRANSPORTPORTAL);
    }

    if (isLocalhost) {
      ReactGA.initialize(GoogleAnalyticsTrackingId.LOCALHOST);
    }
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

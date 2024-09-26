import { FC, useEffect } from 'react';

const AnalyticsSiteImprove: FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://siteimproveanalytics.com/js/siteanalyze_6255470.js';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default AnalyticsSiteImprove;

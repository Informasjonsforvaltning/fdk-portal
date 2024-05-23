/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */

export const getEnvironment = () => {
  const { hostname } = location;
  let environment = '';
  if (hostname.includes('staging')) {
    environment = 'STAG-';
  } else if (hostname.includes('demo')) {
    environment = 'DEMO-';
  } else if (hostname.includes('localhost')) {
    environment = 'LOCAL-';
  } else {
    environment = 'PROD-';
  }
  return environment;
};

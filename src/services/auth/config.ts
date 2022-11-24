import type { UserManagerSettings } from 'oidc-client';

import env from '../../env';

const { OIDC_ISSUER, OIDC_CLIENT_SECRET } = env;

const userManagerSettings: UserManagerSettings = {
  authority: OIDC_ISSUER,
  client_id: 'fdk-portal',
  client_secret: OIDC_CLIENT_SECRET,
  redirect_uri: `${location.origin}/auth`,
  post_logout_redirect_uri: location.href,
  response_type: 'code',
  scope: 'openid authorities profile email',
  revokeAccessTokenOnSignout: false
};

export default userManagerSettings;

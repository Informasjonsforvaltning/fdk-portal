import 'core-js-pure/stable';
import 'regenerator-runtime/runtime';

import { UserManager, Log } from 'oidc-client';

import config from '../../services/auth/config';

async function run(): Promise<void> {
  const manager: UserManager = new UserManager({
    response_mode: 'query',
    ...config
  });

  let path = '/';

  const isInIframe = location !== parent.location;

  try {
    const user = await (isInIframe
      ? manager.signinSilentCallback()
      : manager.signinRedirectCallback());

    if (!isInIframe && user?.state?.path) {
      path = user.state.path.replace(location.origin, '');
    }
  } catch (e: any) {
    Log.error('OIDC signin callback failed');
  } finally {
    if (!isInIframe) {
      location.replace(path);
    }
  }
}

run();

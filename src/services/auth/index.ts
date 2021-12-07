import { User, UserManager, Log } from 'oidc-client';
import jwt_decode from 'jwt-decode';

import config from './config';

import type { UserProfile, ResourceRole } from './types';

class AuthService {
  private user: User | null;

  private manager: UserManager;

  constructor() {
    this.manager = new UserManager({
      ...config
    });
    this.manager.events?.addUserLoaded(this.setUser.bind(this));
  }

  public async init(): Promise<boolean> {
    try {
      this.user = await this.manager.getUser();
      if (this.isAuthenticated() && !this.isTokenExpired()) {
        return true;
      }

      await this.cleanUp();

      this.user = await this.manager.signinSilent();
    } catch (e: any) {
      Log.error('OIDC init failed');
    }

    return this.isAuthenticated() && !this.isTokenExpired();
  }

  public async signIn(): Promise<void> {
    try {
      await this.manager.signinRedirect({ data: { path: location.href } });
    } catch (e: any) {
      Log.error('OIDC signin failed');
    }
  }

  public async signOut(): Promise<void> {
    try {
      await this.manager.signoutRedirect();
    } catch (e: any) {
      Log.error('OIDC signout failed');
    }
  }

  public isAuthenticated(): boolean {
    return !!this.user?.access_token;
  }

  public isTokenExpired(): boolean {
    return this.user?.expired ?? true;
  }

  public async getAuthorizationHeader(): Promise<string> {
    try {
      if (this.isTokenExpired()) {
        this.user = await this.manager.signinSilent();
      }

      if (this.user && this.isAuthenticated() && !this.isTokenExpired()) {
        const { token_type, access_token } = this.user;
        return `${token_type} ${access_token}`;
      }
    } catch (e: any) {
      Log.error('OIDC fetching authorization header failed');
    }

    return '';
  }

  public onUserLoad(callback: (user: User) => void): void {
    this.manager.events.addUserLoaded(callback);
  }

  public getUserProfile(): Partial<UserProfile> {
    if (this.user?.profile) {
      const {
        sub: id,
        user_name: username,
        given_name: firstName,
        family_name: lastName,
        name,
        fdk_terms: fdkTerms = '',
        org_terms = ''
      } = this.user.profile;

      try {
        const { authorities = '' }: any = jwt_decode(this.user.access_token);

        return {
          id,
          username,
          firstName,
          lastName,
          name,
          authorities: authorities.split(','),
          fdkTerms,
          orgTerms: org_terms.split(',')
        };
      } catch (e: any) {
        return {
          id,
          username,
          firstName,
          lastName,
          name,
          authorities: [],
          fdkTerms,
          orgTerms: org_terms.split(',')
        };
      }
    }

    return {};
  }

  public getResourceRoles(): ResourceRole[] {
    return (
      this.getUserProfile()
        .authorities?.map(authority => authority.split(':'))
        ?.map(([resource, resourceId, role]) => ({
          resource,
          resourceId,
          role
        })) ?? []
    );
  }

  public hasSystemAdminPermission(): boolean {
    return this.hasResourceRole({
      resource: 'system',
      resourceId: 'root',
      role: 'admin'
    });
  }

  public hasOrganizationReadPermission(organizationNumber: string): boolean {
    return this.getResourceRoles().some(
      ({ resource, resourceId }) =>
        resource === 'organization' && resourceId === organizationNumber
    );
  }

  public hasOrganizationWritePermission(resourceId: string): boolean {
    return this.hasResourceRole({
      resource: 'organization',
      resourceId,
      role: 'admin'
    });
  }

  public hasOrganizationAdminPermission(resourceId: string): boolean {
    return this.hasResourceRole({
      resource: 'organization',
      resourceId,
      role: 'admin'
    });
  }

  public hasAcceptedLatestTermsAndConditions(
    organizationNumber: string
  ): boolean {
    const { fdkTerms: latestVersion, orgTerms = [] } = this.getUserProfile();
    return orgTerms.some(t => t === `${organizationNumber}:${latestVersion}`);
  }

  public isReadOnlyUser(orgNr: string): boolean {
    return (
      this.hasOrganizationReadPermission(orgNr) &&
      !(
        this.hasOrganizationWritePermission(orgNr) ||
        this.hasOrganizationAdminPermission(orgNr) ||
        this.hasSystemAdminPermission()
      )
    );
  }

  public hasAccessRights(orgNr: string): boolean {
    return (
      this.isAuthenticated() &&
      !this.isTokenExpired() &&
      (this.hasOrganizationReadPermission(orgNr) ||
        this.hasOrganizationWritePermission(orgNr) ||
        this.hasOrganizationAdminPermission(orgNr) ||
        this.hasSystemAdminPermission())
    );
  }

  private hasResourceRole({
    resource,
    resourceId,
    role
  }: ResourceRole): boolean {
    return this.getResourceRoles().some(
      r =>
        r.resource === resource &&
        r.resourceId === resourceId &&
        r.role === role
    );
  }

  private setUser(user: User): void {
    this.user = user;
  }

  private async cleanUp(): Promise<void> {
    await this.manager.clearStaleState();
    this.cleanUpStorage([localStorage, sessionStorage]);
  }

  private cleanUpStorage(storages: Storage[]) {
    const keyPrefix: string = 'oidc';

    storages.forEach(storage =>
      Object.keys(storage)
        .filter(key => key.startsWith(keyPrefix))
        .forEach(key => storage.removeItem(key))
    );
  }
}

export default new AuthService();
export { User };

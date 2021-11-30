export interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  name: string;
  authorities: string[];
  fdkTerms: string;
  orgTerms: string[];
}

export interface ResourceRole {
  resource: string;
  resourceId: string;
  role: string;
}

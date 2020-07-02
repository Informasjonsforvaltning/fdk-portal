export const normalizeOrganizationsArray = (organizations: any) =>
  organizations
    .map((organization: any) =>
      organization?.organizationId
        ? {
            id: organization.organizationId,
            ...organization
          }
        : null
    )
    .filter(Boolean);

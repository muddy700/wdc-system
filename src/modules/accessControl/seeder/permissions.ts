export const PERMISSIONS = [
  {
    moduleName: "users",
    genericName: "create-users",
    displayName: "Can create users",
  },
  {
    moduleName: "users",
    genericName: "read-users",
    displayName: "Can view users",
  },
  {
    moduleName: "users",
    genericName: "update-users",
    displayName: "Can update users",
  },
  {
    moduleName: "users",
    genericName: "delete-users",
    displayName: "Can delete users",
  },
  {
    moduleName: "access-control",
    genericName: "create-roles",
    displayName: "Can create roles",
  },
  {
    moduleName: "access-control",
    genericName: "read-roles",
    displayName: "Can view roles",
  },
  {
    moduleName: "access-control",
    genericName: "update-roles",
    displayName: "Can update roles",
  },
  {
    moduleName: "access-control",
    genericName: "delete-roles",
    displayName: "Can delete roles",
  },
  {
    moduleName: "access-control",
    genericName: "read-permissions",
    displayName: "Can view permissions",
  },
  {
    moduleName: "audit-trail",
    genericName: "read-audit-trail",
    displayName: "Can view audit-trail",
  },
];

export const rootPermissions = [
  "read-roles",
  "create-roles",
  "update-roles",
  "delete-roles",

  "read-users",
  "create-users",
  "update-users",
  "delete-users",

  "read-permissions",

  "read-audit-trail",
];

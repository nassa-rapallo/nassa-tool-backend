export const PERMISSION_DEFAULT = {
  CREATE: 'permission_create_',
  GET_ROLES: 'permission_get_roles_',
};

export const CREATE_PERMISSION = {
  OK: PERMISSION_DEFAULT.CREATE + 'ok',
  ERROR: PERMISSION_DEFAULT.CREATE + 'error',
};

export const GET_ROLES = {
  OK: PERMISSION_DEFAULT.GET_ROLES + 'ok',
  BAD_REQUEST: PERMISSION_DEFAULT.GET_ROLES + 'bad_request',
  ERROR: PERMISSION_DEFAULT.GET_ROLES + 'error',
};

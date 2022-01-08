// ROLES RESPONSE MESSAGES
const USER_DEFAULT = {
  CREATE: 'user_create_user_',
  SEARCH_BY_CREDENTIALS: 'user_search_by_credentials_',
  SEARCH_BY_ID: 'user_search_by_id_',
  ADD_ROLE_TO_USER: 'user_add_role_to_user_',
  IS_ADMIN: 'user_is_admin_',
  FORGOT_PASSOWRD: 'user_forgot_password_',
};

export const CREATE_USER = {
  BAD_REQUEST: USER_DEFAULT.CREATE + 'bad_request',
  CREATED: USER_DEFAULT.CREATE + 'created',
  PRECONDITION_FAILED: USER_DEFAULT.CREATE + 'precondition_failed',
};

export const SEARCH_BY_CREDENTIALS = {
  NOT_FOUND: USER_DEFAULT.SEARCH_BY_CREDENTIALS + 'not_found',
  NOT_MATCH: USER_DEFAULT.SEARCH_BY_CREDENTIALS + 'not_match',
  SUCCESS: USER_DEFAULT.SEARCH_BY_CREDENTIALS + 'success',
};

export const SEARCH_BY_ID = {
  BAD_REQUEST: USER_DEFAULT.SEARCH_BY_ID + 'bad_request',
  NOT_FOUND: USER_DEFAULT.SEARCH_BY_ID + 'not_found',
  SUCCESS: USER_DEFAULT.SEARCH_BY_ID + 'success',
};

export const ADD_ROLE_TO_USER = {
  USER_NOT_FOUND: USER_DEFAULT.ADD_ROLE_TO_USER + 'user_not_found',
  ROLE_NOT_FOUND: USER_DEFAULT.ADD_ROLE_TO_USER + 'role_not_found',
  BAD_REQUEST: USER_DEFAULT.ADD_ROLE_TO_USER + 'bad_request',
  SUCCESS: USER_DEFAULT.ADD_ROLE_TO_USER + 'success',
};

export const IS_ADMIN = {
  UNAUTHORIZED: USER_DEFAULT.IS_ADMIN + 'unauthorized',
  OK: USER_DEFAULT.IS_ADMIN + 'ok',
  ERROR: USER_DEFAULT.IS_ADMIN + 'error',
};

export const FORGOT_PASSWORD = {
  OK: USER_DEFAULT.FORGOT_PASSOWRD + 'ok',
  BAD_REQUEST: USER_DEFAULT.FORGOT_PASSOWRD + 'bad_request',
};

// ROLES RESPONSE MESSAGES
const ROLE_DEFAULT = {
  GET_ALL_ROLES: 'user_get_all_roles_',
  GET_ROLE: 'user_get_role_',
  CREATE_ROLE: 'user_create_role_',
  UPDATE_ROLE: 'user_update_role',
};

export const GET_ALL_ROLES = {
  BAD_REQUEST: ROLE_DEFAULT.GET_ALL_ROLES + 'bad_request',
  SUCCESS: ROLE_DEFAULT.GET_ALL_ROLES + 'success',
};

export const GET_ROLE = {
  BAD_REQUEST: ROLE_DEFAULT.GET_ROLE + 'bad_request',
  SUCCESS: ROLE_DEFAULT.GET_ROLE + 'success',
};

export const CREATE_ROLE = {
  BAD_REQUEST: ROLE_DEFAULT.CREATE_ROLE + 'bad_request',
  SUCCESS: ROLE_DEFAULT.CREATE_ROLE + 'success',
};

export const UPDATE_ROLE = {
  BAD_REQUEST: ROLE_DEFAULT.UPDATE_ROLE + 'bad_request',
  SUCCESS: ROLE_DEFAULT.UPDATE_ROLE + 'success',
};

// LINK RESPONSE MESSAGES
const LINK_DEFAULT = {
  CONFIRM_LINK: 'user_confirm_link',
};

export const CONFIRM_LINK = {
  BAD_REQUEST: LINK_DEFAULT.CONFIRM_LINK + 'bad_request',
  SUCCESS: LINK_DEFAULT.CONFIRM_LINK + 'success',
};

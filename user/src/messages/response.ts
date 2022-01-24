/* -------------------------------------------------------------------------- */
/*                           USER RESPONSE MESSAGES                           */
/* -------------------------------------------------------------------------- */
const USER_DEFAULT = {
  CREATE: 'user_create_user_',
  SEARCH_BY_CREDENTIALS: 'user_search_by_credentials_',
  GET: 'user_get_',
  DELETE: 'user_delete_',
  UPDATE: 'user_update_',
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

export const GET_USER = {
  BAD_REQUEST: USER_DEFAULT.GET + 'bad_request',
  NOT_FOUND: USER_DEFAULT.GET + 'not_found',
  SUCCESS: USER_DEFAULT.GET + 'success',
};

export const DELETE_USER = {
  SUCCESS: USER_DEFAULT.DELETE + 'success',
  ERROR: USER_DEFAULT.DELETE + 'error',
};

export const UPDATE_USER = {
  SUCCESS: USER_DEFAULT.UPDATE + 'success',
  ERROR: USER_DEFAULT.UPDATE + 'error',
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

/* -------------------------------------------------------------------------- */
/*                           ROLES RESPONSE MESSAGES                          */
/* -------------------------------------------------------------------------- */
const ROLE_DEFAULT = {
  GET_ALL_ROLES: 'user_get_all_roles_',
  GET_ROLE: 'user_get_role_',
  CREATE_ROLE: 'user_create_role_',
  UPDATE_ROLE: 'user_update_role_',
  DELETE_ROLE: 'user_delete_role_',
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

export const DELETE_ROLE = {
  SUCCESS: ROLE_DEFAULT.DELETE_ROLE + 'success',
  BAD_REQUEST: ROLE_DEFAULT.DELETE_ROLE + 'bad_request',
};

/* -------------------------------------------------------------------------- */
/*                          SECTION RESPONSE MESSAGES                         */
/* -------------------------------------------------------------------------- */

const SECTION_DEFAULT = {
  GET_ALL_SECTIONS: 'user_get_all_roles_',
  GET_SECTION: 'user_get_role_',
  CREATE_SECTION: 'user_create_role_',
  UPDATE_SECTION: 'user_update_role_',
  DELETE_SECTION: 'user_delete_role_',
};

export const GET_ALL_SECTIONS = {
  BAD_REQUEST: SECTION_DEFAULT.GET_ALL_SECTIONS + 'bad_request',
  SUCCESS: SECTION_DEFAULT.GET_ALL_SECTIONS + 'success',
};

export const GET_SECTION = {
  BAD_REQUEST: SECTION_DEFAULT.GET_SECTION + 'bad_request',
  SUCCESS: SECTION_DEFAULT.GET_SECTION + 'success',
};

export const CREATE_SECTION = {
  BAD_REQUEST: SECTION_DEFAULT.CREATE_SECTION + 'bad_request',
  SUCCESS: SECTION_DEFAULT.CREATE_SECTION + 'success',
};

export const UPDATE_SECTION = {
  BAD_REQUEST: SECTION_DEFAULT.UPDATE_SECTION + 'bad_request',
  SUCCESS: SECTION_DEFAULT.UPDATE_SECTION + 'success',
};

export const DELETE_SECTION = {
  SUCCESS: SECTION_DEFAULT.DELETE_SECTION + 'success',
  BAD_REQUEST: SECTION_DEFAULT.DELETE_SECTION + 'bad_request',
};

/* -------------------------------------------------------------------------- */
/*                           LINK RESPONSE MESSAGES                           */
/* -------------------------------------------------------------------------- */
const LINK_DEFAULT = {
  CONFIRM_LINK: 'user_confirm_link',
};

export const CONFIRM_LINK = {
  BAD_REQUEST: LINK_DEFAULT.CONFIRM_LINK + 'bad_request',
  SUCCESS: LINK_DEFAULT.CONFIRM_LINK + 'success',
};

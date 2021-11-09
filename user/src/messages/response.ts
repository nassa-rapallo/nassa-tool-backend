// ROLES RESPONSE MESSAGES
const USER_DEFAULT = {
  SEARCH_BY_CREDENTIALS: 'user_search_by_credentials_',
  SEARCH_BY_ID: 'user_search_by_id_',
  ADD_ROLE_TO_USER: 'user_add_role_to_user_',
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

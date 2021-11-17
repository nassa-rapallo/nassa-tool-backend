const DEFAULT = {
  CREATE: 'permissione_create_rule_',
  GET_ALL: 'permissione_get_all_rule_',
  GET_ID: 'permission_get_rule_by_id_',
  UPDATE: 'permissione_update_rule_',
  DELETE: 'permissione_delete_rule_',
};

export const RULE_RESPONSE = {
  CREATE: {
    CREATED: DEFAULT.CREATE + 'created',
    BAD_REQUEST: DEFAULT.CREATE + 'bad_request',
  },

  GET_ALL: {
    NOT_FOUND: DEFAULT.GET_ALL + 'not_found',
    FOUND: DEFAULT.GET_ALL + 'found',
    SERVER_ERROR: DEFAULT.GET_ALL + 'server_error',
  },

  GET_BY_ID: {
    FOUND: DEFAULT.GET_ID + 'found',
    NOT_FOUND: DEFAULT.GET_ID + 'not_found',
  },

  UPDATE: {
    UPDATED: DEFAULT.UPDATE + 'updated',
    SERVER_ERROR: DEFAULT.UPDATE + 'server_error',
  },

  DELETE: {
    DELETED: DEFAULT.DELETE + 'deleted',
    SERVER_ERROR: DEFAULT.DELETE + 'server_error',
  },
};

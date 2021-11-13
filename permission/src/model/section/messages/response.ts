const DEFAULT = {
  CREATE: 'permission_create_section_',
  GET_ALL: 'permission_get_all_section_',
  GET: 'permission_get_section_',
};

export const SECTION_RESPONSE = {
  SECTION_CREATE: {
    CREATED: DEFAULT.CREATE + 'created',
    PRECONDITION_FAILED: DEFAULT.CREATE + 'precondition_failed',
  },

  SECTION_GET_ALL: {
    FOUND: DEFAULT.GET_ALL + 'found',
    NOT_FOUND: DEFAULT.GET_ALL + 'not_found',
    BAD_REQUEST: DEFAULT.GET_ALL + 'bad_request',
  },

  SECTION_GET: {
    FOUND: DEFAULT.GET + 'found',
    NOT_FOUND: DEFAULT.GET + 'not_found',
  },
};

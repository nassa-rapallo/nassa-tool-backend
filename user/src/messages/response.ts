const DEFAULT = {
  SEARCH_BY_CREDENTIALS: 'user_search_by_credentials_',
  SEARCH_BY_ID: 'user_search_by_id_',
};

export const SEARCH_BY_CREDENTIALS = {
  NOT_FOUND: DEFAULT.SEARCH_BY_CREDENTIALS + 'not_found',
  NOT_MATCH: DEFAULT.SEARCH_BY_CREDENTIALS + 'not_match',
  SUCCESS: DEFAULT.SEARCH_BY_CREDENTIALS + 'success',
};

export const SEARCH_BY_ID = {
  BAD_REQUEST: DEFAULT.SEARCH_BY_ID + 'bad_request',
  NOT_FOUND: DEFAULT.SEARCH_BY_ID + 'not_found',
  SUCCESS: DEFAULT.SEARCH_BY_ID + 'success',
};

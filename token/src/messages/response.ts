const DEFAULT = {
  TOKEN_CREATE: 'user_token_create_',
  TOKEN_DECODE: 'user_token_decode_',
  TOKEN_DESTROY: 'user_token_destroy_',
};

export const CREATE = {
  BAD_REQUEST: DEFAULT.TOKEN_CREATE + 'bad_request',
  SUCCESS: DEFAULT.TOKEN_CREATE + 'success',
};

export const DECODE = {
  UNAUTHORIZED: DEFAULT.TOKEN_DECODE + 'unauthorized',
  SUCCESS: DEFAULT.TOKEN_DECODE + 'success',
};

export const DESTROY = {
  SUCCESS: DEFAULT.TOKEN_DESTROY + 'success',
  FAILURE: DEFAULT.TOKEN_DESTROY + 'failure',
};

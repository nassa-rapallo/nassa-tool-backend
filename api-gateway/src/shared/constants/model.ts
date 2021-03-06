import { HttpStatus } from '@nestjs/common';

export const UUID = '1c8868e0-c83f-4133-9a5f-1dbce8d88b86';
export const SECTION = 'ALL';
export const ROLE = 'nassarolÉ™';
export const ACTION = 'user_create_user';
export const USER = 'user_name';
export const EMAIL = 'username@mail.it';
export const PASSWORD = 'hunter12';
export const STATUS = HttpStatus.OK;
export const MESSAGE = 'user_search_by_id_success';
export const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

export const SEND_EMAIL = {
  to: EMAIL,
  subject: 'Conferma User',
  templates: 'confirmation',
  context: { link: `https://nassarapallo.it/user/confirm/${TOKEN}` },
};

import { Response } from './Response';

export type ConfirmUserResponse = Promise<Response<{ confirmed: boolean }>>;

export type ChangePasswordResponse = Promise<Response<{ changed: boolean }>>;

import { Response } from '../shared/Response';

export type ConfirmUserResponse = Promise<Response<{ confirmed: boolean }>>;

export type ChangePasswordResponse = Promise<Response<{ changed: boolean }>>;

import { Response } from 'src/shared/Response';

export type ConfirmUser = Promise<Response<{ confirmed: boolean }>>;
export type ChangePassword = Promise<Response<{ changed: boolean }>>;

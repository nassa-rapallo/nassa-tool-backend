import { Response } from './Response';

export type IsAdminResponse = Promise<Response<{ admin: boolean }>>;

export type ForgotPasswordResponse = Promise<
  Response<{ link: string; email: string }>
>;

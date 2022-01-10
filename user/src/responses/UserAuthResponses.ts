import { Response } from './Response';

export type IsAdminResponse = Promise<Response<{ admin: boolean }>>;

export type ForgotAdminResponse = Promise<
  Response<{ link: string; email: string }>
>;

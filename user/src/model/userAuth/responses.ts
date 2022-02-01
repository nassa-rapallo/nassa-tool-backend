import { Response } from 'src/shared/Response';

export type IsAdmin = Promise<Response<{ admin: boolean }>>;

export type ForgotPassword = Promise<Response<{ link: string; email: string }>>;

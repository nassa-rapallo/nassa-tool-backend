import { Response } from 'src/lib/Response';
import { User } from './User';

// USER
export type UserResponse = Promise<Response<{ user: Partial<User> }>>;
export type UserLinkResponse = Promise<
  Response<{ user: Partial<User> } & { link?: string }>
>;
export type UserSearchResponse = Promise<Response<{ user: Partial<User> }>>;

//LINK
export type ConfirmUserResponse = Promise<Response<{ confirmed: boolean }>>;
export type ChangePasswordResponse = Promise<Response<{ changed: boolean }>>;

// USERAUTH
export type IsAdminResponse = Promise<Response<{ admin: boolean }>>;
export type ForgotPasswordResponse = Promise<
  Response<{ link: string; email: string }>
>;

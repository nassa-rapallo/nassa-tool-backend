import { Response } from 'src/lib/Response';
import { User } from './User';

export type UserResponse = Promise<Response<{ user: Partial<User> }>>;

export type UserLinkResponse = Promise<
  Response<{ user: Partial<User> } & { link?: string }>
>;

export type UserSearchResponse = Promise<Response<{ user: Partial<User> }>>;

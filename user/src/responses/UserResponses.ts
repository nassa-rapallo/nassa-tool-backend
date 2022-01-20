import { User } from 'src/entities/user.entity';
import { Response } from './Response';

export type UserResponse = Promise<Response<{ user: Partial<User> }>>;

export type UserLinkResponse = Promise<
  Response<{ user: Partial<User> } & { link?: string }>
>;

export type UserDeletedResponse = Promise<Response<{ deleted: boolean }>>;

export type UserUpdatedResponse = Promise<
  Response<{ updated: boolean; user?: User }>
>;

export type UserSearchResponse = Promise<Response<{ user: Partial<User> }>>;

export type UserSearchAllResponse = Promise<Response<{ users: User[] }>>;

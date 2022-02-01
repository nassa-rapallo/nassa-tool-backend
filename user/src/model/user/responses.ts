import { User } from 'src/entities/user.entity';
import { Response } from 'src/responses/Response';

export type UserLink = Promise<
  Response<{ user: Partial<User> } & { link?: string }>
>;
export type UserGet = Promise<Response<{ user: Partial<User> }>>;
export type UserGetAll = Promise<Response<{ users: User[] }>>;
export type UserCreated = Promise<Response<{ user: Partial<User> }>>;
export type UserDeleted = Promise<Response<{ deleted: boolean }>>;
export type UserUpdated = Promise<Response<{ updated: boolean }>>;

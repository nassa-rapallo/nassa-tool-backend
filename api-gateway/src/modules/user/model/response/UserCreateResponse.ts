import { Response } from 'src/lib/Response';
import { User } from '../User';

export type UserCreateResponse = Response<
  { user: Partial<User> } & { link?: string }
>;

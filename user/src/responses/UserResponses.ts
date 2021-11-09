import { User } from 'src/entities/user.entity';
import { Response } from './Response';

export type UserResponse = Response<{ user: Partial<User> }>;
export type UserSearchResponse = Response<{ user: Partial<User> }>;

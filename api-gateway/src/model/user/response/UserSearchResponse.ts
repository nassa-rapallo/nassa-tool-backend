import { Response } from 'src/lib/Response';
import { User } from '../User';

export type UserSearchResponse = Response<{ user: User }>;

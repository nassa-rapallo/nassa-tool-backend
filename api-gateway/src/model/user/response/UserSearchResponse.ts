import { User } from '../User';

export class UserSearchResponse {
  status: number;
  message: string;
  user: User | null;
}

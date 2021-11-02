import { UserResponse } from './UserResponse';

export class UserSearchResponse {
  status: number;
  message: string;
  user: UserResponse | null;
}

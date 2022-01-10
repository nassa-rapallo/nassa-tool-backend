import { Role } from '../../role/model/Role';

export class User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

import { Role } from 'src/entities/role.entity';
import { Response } from './Response';

export type RoleResponse = Promise<Response<{ role: Partial<Role> }>>;

export type AllRolesResponse = Promise<
  Response<{ roles: Array<Partial<Role>> }>
>;

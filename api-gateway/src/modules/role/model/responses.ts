import { Response } from 'src/lib/Response';
import { Role } from './Role';

export type RoleResponse = Promise<Response<{ role: Partial<Role> }>>;

export type RoleSearchAllResponse = Promise<
  Response<{ roles: Array<Partial<Role>> }>
>;

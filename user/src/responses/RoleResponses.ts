import { Role } from 'src/entities/role.entity';
import { Response } from '../shared/Response';

export type RoleResponse = Promise<Response<{ role: Partial<Role> }>>;

export type RoleUpdatedResponse = Promise<
  Response<{ updated: boolean; role?: Role }>
>;
export type RoleDeletedResponse = Promise<Response<{ deleted: boolean }>>;

export type RoleSearchAllResponse = Promise<
  Response<{ roles: Array<Partial<Role>> }>
>;

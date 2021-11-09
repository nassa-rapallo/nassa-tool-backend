import { Role } from 'src/entities/role.entity';
import { Response } from './Response';

export type RoleResponse = Response<{ role: Partial<Role> }>;

export type AllRolesResponse = Response<{ roles: Array<Partial<Role>> }>;

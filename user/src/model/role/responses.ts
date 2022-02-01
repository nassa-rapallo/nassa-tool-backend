import { Role } from 'src/entities/role.entity';
import { Response } from 'src/shared/Response';

export type GetAll = Promise<Response<{ roles: Array<Partial<Role>> }>>;
export type Get = Promise<Response<{ role: Partial<Role> }>>;

export type Created = Promise<Response<{ role: Partial<Role> }>>;
export type Updated = Promise<Response<{ updated: boolean }>>;
export type Deleted = Promise<Response<{ deleted: boolean }>>;

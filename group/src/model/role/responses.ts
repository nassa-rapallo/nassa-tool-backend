import { Role } from 'src/entities/role.entity';
import { Response } from 'src/shared/Response';

export type GetAll = Promise<Response<{ roles: Role[] }>>;
export type Get = Promise<Response<{ role: Role }>>;
export type Created = Promise<Response<{ role: Role }>>;
export type Deleted = Promise<Response<{ deleted: boolean }>>;
export type Updated = Promise<Response<{ updated: boolean }>>;

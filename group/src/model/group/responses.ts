import { Group } from 'src/entities/group.entity';
import { Response } from 'src/shared/Response';

export type GetAll = Promise<Response<{ groups: Group[] }>>;
export type Get = Promise<Response<{ group: Group }>>;
export type Created = Promise<Response<{ group: Group }>>;
export type Deleted = Promise<Response<{ deleted: boolean }>>;
export type Updated = Promise<Response<{ updated: boolean }>>;

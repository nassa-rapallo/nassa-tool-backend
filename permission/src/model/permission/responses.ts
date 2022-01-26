import { Rule } from 'src/entities/rule.entity';
import { Response } from 'src/model/Response';

export type GetPermissionResponse = Promise<Response<{ action: Rule }>>;
export type CreatePermissionResponse = Promise<Response<{ action: Rule }>>;

export type PermissionResponse = Promise<Response<{ action: Rule }>>;

export type DeletePermissionResponse = Promise<Response<{ deleted: true }>>;
export type GetRolesForRuleResponse = Promise<Response<{ roles: string[] }>>;
export type IsPermittedResponse = Promise<Response<{ permitted: boolean }>>;

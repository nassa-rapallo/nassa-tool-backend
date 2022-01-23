import { Rule } from 'src/entities/rule.entity';
import { Section } from 'src/entities/section.entity';
import { Response } from 'src/model/Response';

export type CreatePermissionResponse = Promise<
  Response<{ action: Rule; section: Section }>
>;

export type PermissionResponse = Promise<
  Response<{ action: Rule; section: Section }>
>;

export type DeletePermissionResponse = Promise<Response<{ deleted: true }>>;
export type GetRolesForRuleResponse = Promise<Response<{ roles: string[] }>>;
export type IsPermittedResponse = Promise<Response<{ permitted: boolean }>>;

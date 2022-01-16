import { Response } from 'src/lib/Response';
import { Rule } from './Rule';
import { Section } from './Section';

export type CreatePermissionResponse = Promise<
  Response<{ action: Rule; section: Section }>
>;

export type GetRolesForRuleResponse = Promise<Response<{ roles: string[] }>>;
export type IsPermittedResponse = Promise<Response<{ permitted: boolean }>>;

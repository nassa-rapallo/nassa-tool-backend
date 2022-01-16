import { Rule } from 'src/entities/rule.entity';
import { Response } from 'src/model/Response';

export type RuleResponse = Promise<Response<{ rule: Rule }>>;

export type AllRulesResponse = Promise<Response<{ rules: Rule[] }>>;

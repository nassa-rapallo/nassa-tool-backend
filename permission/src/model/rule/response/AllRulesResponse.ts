import { Rule } from 'src/entities/rule.entity';
import { Response } from 'src/model/Response';

export type AllRulesResponse = Response<{ rules: Rule[] }>;

import { Rule } from 'src/entities/rule.entity';
import { Response } from 'src/model/Response';

export type RuleResponse = Response<{ rule: Rule }>;

import { Rule } from 'src/entities/rule.entity';
import { Get } from './Get';

export class Update extends Get {
  ruleData: Partial<Rule>;
}

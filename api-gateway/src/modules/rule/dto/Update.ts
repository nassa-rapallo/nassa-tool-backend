import { Rule } from 'src/model/Rule';
import { Get } from './Get';

export class Update extends Get {
  ruleData: Partial<Rule>;
}

import { Rule } from 'src/model/Rule';
import * as Common from 'src/shared/common/responses';

export class GetAll extends Common.GetAll<{ rules: Rule[] }> {}
export class Get extends Common.Get<{ rule: Rule }> {}
export class Created extends Common.Created<{ rule: Rule }> {}
export class Deleted extends Common.Deleted {}
export class Updated extends Common.Updated {}

import { Group } from 'src/model/Group';
import * as Common from 'src/shared/common/responses';

export class Created extends Common.Created<{ group: Group }> {}
export class Get extends Common.Get<{ group: Group }> {}
export class GetAll extends Common.GetAll<{ groups: Group[] }> {}
export class Deleted extends Common.Deleted {}
export class Updated extends Common.Updated {}

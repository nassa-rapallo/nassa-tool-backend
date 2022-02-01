import { Role } from 'src/model/Role';
import * as Common from 'src/shared/common/responses';

export class Created extends Common.Created<{ role: Role }> {}
export class Get extends Common.Get<{ role: Role }> {}
export class GetAll extends Common.GetAll<{ roles: Role[] }> {}
export class Deleted extends Common.Deleted {}
export class Updated extends Common.Updated {}

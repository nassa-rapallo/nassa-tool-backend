import { Permission } from 'src/model/Permission';
import * as Common from 'src/shared/common/responses';
import { Permitted } from './Permitted';

export { Permitted };
export class Created extends Common.Created<{ permission: Permission }> {}
export class Get extends Common.Get<{ permission: Permission }> {}
export class GetAll extends Common.GetAll<{ permissions: Permission[] }> {}
export class Deleted extends Common.Deleted {}
export class Updated extends Common.Updated {}

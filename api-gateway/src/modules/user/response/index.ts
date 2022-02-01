import { ChangePassword } from './ChangePassword';
import { Confirm } from './Confirm';
import { ForgotPassword } from './ForgotPassword';
import { UserLink } from './UserLink';

import { User } from './User';
import * as Common from 'src/shared/common/responses';

export { ChangePassword, Confirm, ForgotPassword, UserLink };
export class Get extends Common.Get<{ user: User }> {}
export class GetAll extends Common.GetAll<{ users: User[] }> {}
export class Created extends Common.Created<{ user: User }> {}
export class Deleted extends Common.Deleted {}
export class Updated extends Common.Updated {}

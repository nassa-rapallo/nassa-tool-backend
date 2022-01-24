import { MailerService } from './mailer/mailer.service';
import { PermissionService } from './permission/permission.service';
import { RoleService } from './role/role.service';
import { TokenService } from './token/token.service';
import { UserService } from './user/user.service';

export default [MailerService, PermissionService, RoleService, TokenService, UserService];

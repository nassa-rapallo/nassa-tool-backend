import { UserProvider } from './user.provider';
import { TokenProvider } from './token.provider';
import { MailerProvider } from './mailer.provider';
import { PermissionProvider } from './permission.provider';
import { RoleProvider } from './role.provider';

export default [MailerProvider, PermissionProvider, TokenProvider, UserProvider, RoleProvider];

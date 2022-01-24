import { UserProvider } from './user.provider';
import { TokenProvider } from './token.provider';
import { MailerProvider } from './mailer.provider';
import { PermissionProvider } from './permission.provider';

export default [MailerProvider, PermissionProvider, TokenProvider, UserProvider];

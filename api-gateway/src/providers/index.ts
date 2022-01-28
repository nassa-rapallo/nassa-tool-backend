import { UserProvider } from './user.provider';
import { TokenProvider } from './token.provider';
import { MailerProvider } from './mailer.provider';
import { PermissionProvider } from './permission.provider';
import { SectionProvider } from './section.provider';
import { RoleProvider } from './role.provider';
import { BookProvider } from './book.provider';

export default [
  MailerProvider,
  PermissionProvider,
  TokenProvider,
  UserProvider,
  SectionProvider,
  RoleProvider,
  BookProvider,
];

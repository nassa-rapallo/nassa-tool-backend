import { Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';
import { UserController } from './routes/user.controller';
import { AuthController } from './routes/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './services/guards/authorization.guard';
import { HelloController } from './routes/hello.controller';
import { RoleController } from './routes/role.controller';
import { ValidationGuard } from './services/guards/validation.guard';
import { UserProvider } from './providers/user.provider';
import { TokenProvider } from './providers/token.provider';
import { PermissionProvider } from './providers/permission.provider';
import { MailerProvider } from './providers/mailer.provider';

@Module({
  imports: [],
  controllers: [HelloController, UserController, AuthController, RoleController],
  providers: [
    ConfigService,
    UserProvider,
    TokenProvider,
    PermissionProvider,
    MailerProvider,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ValidationGuard,
    },
  ],
})
export class AppModule {}

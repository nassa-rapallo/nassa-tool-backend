import { Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';

import { UserModule } from './app/user.module';
import { MailerModule } from './app/mailer.module';
import { PermissionModule } from './app/permission.module';
import { RoleModule } from './app/role.module';
import { TokenModule } from './app/token.module';
import { HelloModule } from './app/hello.module';
import { GuardsModule } from './app/guards.module';
import { GroupModule } from './app/group.module';
import { RuleModule } from './app/rule.module';

@Module({
  imports: [
    UserModule,
    MailerModule,
    PermissionModule,
    RoleModule,
    TokenModule,
    GroupModule,
    GuardsModule,
    RuleModule,
    HelloModule,
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppModule {}

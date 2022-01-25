import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';

import { UserModule } from './app/user.module';
import { MailerModule } from './app/mailer.module';
import { PermissionModule } from './app/permission.module';
import { RoleModule } from './app/role.module';
import { SectionModule } from './app/section.module';
import { TokenModule } from './app/token.module';
import { HelloModule } from './app/hello.module';

@Module({
  imports: [MailerModule, PermissionModule, RoleModule, SectionModule, TokenModule, HelloModule],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppModule {}

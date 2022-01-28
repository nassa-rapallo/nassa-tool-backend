import { Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';

import { UserModule } from './app/user.module';
import { MailerModule } from './app/mailer.module';
import { PermissionModule } from './app/permission.module';
import { RoleModule } from './app/role.module';
import { SectionModule } from './app/section.module';
import { TokenModule } from './app/token.module';
import { HelloModule } from './app/hello.module';

import { GuardsModule } from './app/guards.module';
import { BookModule } from './app/book.module';

@Module({
  imports: [
    UserModule,
    MailerModule,
    PermissionModule,
    RoleModule,
    SectionModule,
    TokenModule,
    BookModule,
    HelloModule,
    GuardsModule,
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppModule {}

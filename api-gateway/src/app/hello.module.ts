import { Module } from '@nestjs/common';
import { HelloController } from 'src/routes/hello.controller';
import { GroupModule } from './group.module';
import { MailerModule } from './mailer.module';
import { PermissionModule } from './permission.module';
import { TokenModule } from './token.module';
import { UserModule } from './user.module';

@Module({
  imports: [MailerModule, UserModule, TokenModule, PermissionModule, GroupModule],
  controllers: [HelloController],
})
export class HelloModule {}

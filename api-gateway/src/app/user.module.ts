import { ConfigService } from 'src/services/config/config.service';
import { Module } from '@nestjs/common';
import { UserProvider } from 'src/providers/user.provider';
import { UserController } from 'src/routes/user.controller';
import { UserService } from 'src/services/clients/user/user.service';
import { MailerModule } from './mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [UserController],
  providers: [ConfigService, UserProvider, UserService],
  exports: [UserProvider, UserService],
})
export class UserModule {}

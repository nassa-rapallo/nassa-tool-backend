import { MailerModule as NestMailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { ConfigService } from './services/config/config.service';
import { MailerConfigService } from './services/config/mailer-config.service';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      useClass: MailerConfigService,
    }),
  ],
  controllers: [MailerController],
  providers: [ConfigService],
})
export class MailerModule {}

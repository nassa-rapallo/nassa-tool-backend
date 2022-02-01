import { MailerService } from 'src/services/clients/mailer/mailer.service';
import { MailerProvider } from 'src/providers/mailer.provider';
import { Module } from '@nestjs/common';
import { ConfigService } from 'src/services/config/config.service';

@Module({
  imports: [],
  providers: [ConfigService, MailerProvider, MailerService],
  exports: [MailerProvider, MailerService],
})
export class MailerModule {}

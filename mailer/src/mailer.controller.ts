import { MailerService } from '@nest-modules/mailer';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MAILER_SEND } from './messages/command';
import { SEND_MAIL } from './messages/response';
import { EmailData } from './model/EmailDataDto';
import { MailResponse } from './response/MailResponse';
import { ConfigService } from './services/config/config.service';

@Controller()
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @MessagePattern('hello_mailer')
  getHello(): string {
    return 'Hello from Mailer';
  }

  @MessagePattern(MAILER_SEND)
  mailSend(data: EmailData): MailResponse {
    if (!this.configService.get('isEmailDisabled')) {
      this.mailerService.sendMail(data);
    }
    return {
      status: HttpStatus.ACCEPTED,
      message: SEND_MAIL.ACCEPTED,
      data: true,
    };
  }
}

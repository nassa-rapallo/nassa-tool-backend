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
  async mailSend(data: EmailData): Promise<MailResponse> {
    if (!this.configService.get('isEmailDisabled')) {
      const result = await this.mailerService.sendMail(data);
      console.log('------RES', result);
    }
    console.log('------ HERE ');
    return {
      status: HttpStatus.ACCEPTED,
      message: SEND_MAIL.ACCEPTED,
      data: true,
    };
  }
}

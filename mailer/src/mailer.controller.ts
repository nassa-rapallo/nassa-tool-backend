import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailerService } from './services/mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly appService: MailerService) {}

  @MessagePattern('hello_mailer')
  getHello(): string {
    return 'Hello from Mailer';
  }
}

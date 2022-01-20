import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { MAILER_SERVICE } from '../clientsName';

import * as COMMANDS from './commands';
import * as Dto from 'src/modules/mailer/dto';
import * as Responses from 'src/modules/mailer/response';

@Injectable()
export class MailerService {
  constructor(@Inject(MAILER_SERVICE) private readonly mailerClient: ClientProxy) {}

  async mailerSend(data: Dto.SendMailDto): Promise<Responses.MailResponse> {
    return firstValueFrom(
      this.mailerClient.send<Responses.MailResponse, Dto.SendMailDto>(COMMANDS.MAILER_SEND, data),
    );
  }
}

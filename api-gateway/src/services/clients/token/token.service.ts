import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { TOKEN_SERVICE } from '../clientsName';

import * as COMMANDS from './commands';
import * as Dto from 'src/modules/token/dto';
import * as Responses from 'src/modules/token/response';

@Injectable()
export class TokenService {
  constructor(@Inject(TOKEN_SERVICE) private readonly tokenClient: ClientProxy) {}

  async tokenCreate(data: Dto.Create): Promise<Responses.Token> {
    return firstValueFrom(
      this.tokenClient.send<Responses.Token, Dto.Create>(COMMANDS.TOKEN_CREATE, data),
    );
  }

  async tokenDestroy(data: Dto.Destroy): Promise<Responses.TokenDestroy> {
    return firstValueFrom(
      this.tokenClient.send<Responses.TokenDestroy, Dto.Destroy>(COMMANDS.TOKEN_DESTROY, data),
    );
  }

  async tokenDecode(data: Dto.Decode): Promise<Responses.DecodeToken> {
    return firstValueFrom(
      this.tokenClient.send<Responses.DecodeToken, Dto.Decode>(COMMANDS.TOKEN_DECODE, data),
    );
  }
}

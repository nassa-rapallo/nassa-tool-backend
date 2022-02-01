import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { PERMISSION_SERVICE } from '../clientsName';

import * as COMMANDS from './commands';
import * as Dto from 'src/modules/rule/dto';
import * as Responses from 'src/modules/rule/responses';

@Injectable()
export class RuleService {
  constructor(@Inject(PERMISSION_SERVICE) private readonly client: ClientProxy) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  async groupGetAll(): Promise<Responses.GetAll> {
    return firstValueFrom(this.client.send<Responses.GetAll>(COMMANDS.GET_ALL, {}));
  }

  async groupGet(data: Dto.Get): Promise<Responses.Get> {
    return firstValueFrom(this.client.send<Responses.Get, Dto.Get>(COMMANDS.GET, data));
  }

  async groupCreate(data: Dto.Create): Promise<Responses.Created> {
    return firstValueFrom(this.client.send<Responses.Created, Dto.Create>(COMMANDS.CREATE, data));
  }

  async groupUpdate(data: Dto.Update): Promise<Responses.Updated> {
    return firstValueFrom(this.client.send<Responses.Updated, Dto.Update>(COMMANDS.UPDATE, data));
  }

  async groupDelete(data: Dto.Delete): Promise<Responses.Deleted> {
    return firstValueFrom(this.client.send<Responses.Deleted, Dto.Delete>(COMMANDS.DELETE, data));
  }
}

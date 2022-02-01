import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { GROUP_SERVICE } from '../clientsName';

import * as COMMANDS from './commands';
import * as Dto from 'src/modules/group/dto';
import * as Responses from 'src/modules/group/responses';

@Injectable()
export class GroupService {
  constructor(@Inject(GROUP_SERVICE) private readonly groupClient: ClientProxy) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  async groupGetAll(): Promise<Responses.GetAll> {
    return firstValueFrom(this.groupClient.send<Responses.GetAll>(COMMANDS.GET_ALL, {}));
  }

  async groupGet(data: Dto.Get): Promise<Responses.Get> {
    return firstValueFrom(this.groupClient.send<Responses.Get, Dto.Get>(COMMANDS.GET, data));
  }

  async groupCreate(data: Dto.Create): Promise<Responses.Created> {
    return firstValueFrom(
      this.groupClient.send<Responses.Created, Dto.Create>(COMMANDS.CREATE, data),
    );
  }

  async groupUpdate(data: Dto.Update): Promise<Responses.Updated> {
    return firstValueFrom(
      this.groupClient.send<Responses.Updated, Dto.Update>(COMMANDS.UPDATE, data),
    );
  }

  async groupDelete(data: Dto.Delete): Promise<Responses.Deleted> {
    return firstValueFrom(
      this.groupClient.send<Responses.Deleted, Dto.Delete>(COMMANDS.DELETE, data),
    );
  }
}

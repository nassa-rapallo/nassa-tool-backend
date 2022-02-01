import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

import { ROLE_SERVICE } from '../clientsName';

import * as COMMANDS from './commands';
import * as Dto from 'src/modules/role/dto';
import * as Param from 'src/modules/role/param';
import * as Responses from 'src/modules/role/response';

@Injectable()
export class RoleService {
  constructor(@Inject(ROLE_SERVICE) private readonly roleClient: ClientProxy) {}

  async roleGetAll(): Promise<Responses.RoleGetAll> {
    return firstValueFrom(this.roleClient.send<Responses.RoleGetAll>(COMMANDS.GET_ALL, {}));
  }

  async roleGet(data: Param.GetRole): Promise<Responses.Role> {
    return firstValueFrom(this.roleClient.send<Responses.Role, Param.GetRole>(COMMANDS.GET, data));
  }

  async roleGetByGroup(data: Dto.RoleGetByGroup): Promise<Responses.Role> {
    return firstValueFrom(
      this.roleClient.send<Responses.Role, Dto.RoleGetByGroup>(COMMANDS.GET_BY_GROUP, data),
    );
  }

  async roleCreate(data: Dto.RoleCreate): Promise<Responses.Role> {
    return firstValueFrom(
      this.roleClient.send<Responses.Role, Dto.RoleCreate>(COMMANDS.CREATE, data),
    );
  }

  async roleDelete(data: Dto.RoleDelete): Promise<Responses.RoleDeleted> {
    return firstValueFrom(
      this.roleClient.send<Responses.RoleDeleted, Dto.RoleDelete>(COMMANDS.DELETE, data),
    );
  }

  async roleUpdate(data: Dto.RoleUpdate): Promise<Responses.RoleUpdated> {
    return firstValueFrom(
      this.roleClient.send<Responses.RoleUpdated, Dto.RoleUpdate>(COMMANDS.UPDATE, data),
    );
  }
}

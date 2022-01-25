import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

import { USER_SERVICE } from '../clientsName';

import * as COMMANDS from './commands';
import * as Dto from 'src/modules/role/dto';
import * as Param from 'src/modules/role/param';
import * as Responses from 'src/modules/role/response';

@Injectable()
export class RoleService {
  constructor(@Inject(USER_SERVICE) private readonly roleClient: ClientProxy) {}

  async roleGetAll(): Promise<Responses.RoleGetAll> {
    return firstValueFrom(this.roleClient.send<Responses.RoleGetAll>(COMMANDS.ROLE_GET_ALL, {}));
  }

  async roleGet(data: Param.GetRole): Promise<Responses.Role> {
    return firstValueFrom(
      this.roleClient.send<Responses.Role, Param.GetRole>(COMMANDS.ROLE_GET, data),
    );
  }

  async roleCreate(data: Dto.CreateRoleDto): Promise<Responses.Role> {
    return firstValueFrom(
      this.roleClient.send<Responses.Role, Dto.CreateRoleDto>(COMMANDS.ROLE_CREATE, data),
    );
  }

  async roleDelete(data: Dto.DeleteRoleDto): Promise<Responses.RoleDeleted> {
    return firstValueFrom(
      this.roleClient.send<Responses.RoleDeleted, Dto.DeleteRoleDto>(COMMANDS.ROLE_DELETE, data),
    );
  }

  async roleUpdate(data: Dto.UpdateRoleDto): Promise<Responses.RoleUpdated> {
    return firstValueFrom(
      this.roleClient.send<Responses.RoleUpdated, Dto.UpdateRoleDto>(COMMANDS.ROLE_UPDATE, data),
    );
  }
}

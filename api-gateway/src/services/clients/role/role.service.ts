import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

import { ROLE_SERVICE } from '../clientsName';

import * as COMMANDS from './commands';
import * as Dto from 'src/modules/role/dto';
import * as Param from 'src/modules/role/param';
import * as Responses from 'src/modules/role/response';
import { ConfigService } from 'src/services/config/config.service';
import { Types } from 'src/modules/role/Types';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_SERVICE) private readonly roleClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async roleGetAll(): Promise<Responses.GetAll> {
    return firstValueFrom(this.roleClient.send<Responses.GetAll>(COMMANDS.GET_ALL, {}));
  }

  async roleGet(data: Param.GetRole): Promise<Responses.Get> {
    return firstValueFrom(this.roleClient.send<Responses.Get, Param.GetRole>(COMMANDS.GET, data));
  }

  async roleGetByGroup(data: Dto.RoleGetByGroup): Promise<Responses.Get> {
    return firstValueFrom(
      this.roleClient.send<Responses.Get, Dto.RoleGetByGroup>(COMMANDS.GET_BY_GROUP, data),
    );
  }

  async roleGetByType(data: Dto.RoleGetByType): Promise<Responses.Get> {
    return firstValueFrom(
      this.roleClient.send<Responses.Get, Dto.RoleGetByType>(COMMANDS.GET_GROUP_TYPE, data),
    );
  }

  async roleCreate(data: Dto.RoleCreate): Promise<Responses.Created> {
    return firstValueFrom(
      this.roleClient.send<Responses.Created, Dto.RoleCreate>(COMMANDS.CREATE, data),
    );
  }

  async roleDelete(data: Dto.RoleDelete): Promise<Responses.Deleted> {
    return firstValueFrom(
      this.roleClient.send<Responses.Deleted, Dto.RoleDelete>(COMMANDS.DELETE, data),
    );
  }

  async roleUpdate(data: Dto.RoleUpdate): Promise<Responses.Updated> {
    return firstValueFrom(
      this.roleClient.send<Responses.Updated, Dto.RoleUpdate>(COMMANDS.UPDATE, data),
    );
  }

  async roleGetGlobalAdmin(): Promise<Responses.Get> {
    const globalCodename: string = this.configService.get('globalCodename');

    return firstValueFrom(
      this.roleClient.send<Responses.Get, Dto.RoleGetByType>(COMMANDS.GET_GROUP_TYPE, {
        type: Types.ADMIN,
        groupCodeName: globalCodename,
      }),
    );
  }
}

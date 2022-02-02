import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { PERMISSION_SERVICE } from '../clientsName';

import * as COMMANDS from './commands';
import * as Dto from 'src/modules/permission/dto';
import * as Responses from 'src/modules/permission/response';

@Injectable()
export class PermissionService {
  constructor(@Inject(PERMISSION_SERVICE) private readonly permissionClient: ClientProxy) {}

  /* -------------------------------------------------------------------------- */
  /*                                    CRUD                                    */
  /* -------------------------------------------------------------------------- */

  async permissionGetAll(): Promise<Responses.GetAll> {
    return firstValueFrom(this.permissionClient.send<Responses.GetAll>(COMMANDS.GET_ALL, {}));
  }

  async permissionGet(data: Dto.Get): Promise<Responses.Get> {
    return firstValueFrom(this.permissionClient.send<Responses.Get, Dto.Get>(COMMANDS.GET, data));
  }

  async permissionGetByAction(data: Dto.GetByAction): Promise<Responses.Get> {
    return firstValueFrom(
      this.permissionClient.send<Responses.Get, Dto.GetByAction>(COMMANDS.GET_BY_NAME, data),
    );
  }

  async permissionCreate(data: Dto.Create): Promise<Responses.Created> {
    return firstValueFrom(
      this.permissionClient.send<Responses.Created, Dto.Create>(COMMANDS.CREATE, data),
    );
  }

  async permissionUpdate(data: Dto.Update): Promise<Responses.Updated> {
    return firstValueFrom(
      this.permissionClient.send<Responses.Updated, Dto.Update>(COMMANDS.UPDATE, data),
    );
  }

  async permissionDelete(data: Dto.Delete): Promise<Responses.Deleted> {
    return firstValueFrom(
      this.permissionClient.send<Responses.Deleted, Dto.Delete>(COMMANDS.DELETE, data),
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                               FUNCTIONALITIES                              */
  /* -------------------------------------------------------------------------- */

  async permissionIsPermitted(data: Dto.Permitted): Promise<Responses.Permitted> {
    return firstValueFrom(
      this.permissionClient.send<Responses.Permitted, Dto.Permitted>(COMMANDS.PERMITTED, data),
    );
  }
}
